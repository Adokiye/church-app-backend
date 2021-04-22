import schedule from 'node-schedule'
import Brand from '../models/brand'
import MealCategory from '../models/meal_category'
import SuperMealCategory from '../models/supermeal_category'
import Meal from '../models/meal'
import Addon from '../models/addons'
import MealCategorySelectionType from '../models/meal_category_selection_type'
import { NODE_ENV } from '../config'
import { getPosistBrandMenu } from '../helpers'

const jobEnvironment = {
  development: '*/5 * * * *',
  production: '*/5 * * * *'
}

const job = schedule.scheduleJob(jobEnvironment[NODE_ENV], async () => {
  console.log('Task: Updating BRAND MENU')
  const brands = await Brand.query().catch(e => [])
  const meal_category_selection_types = await MealCategorySelectionType.query().catch(
    e => []
  )
  for (let i = 0; i < brands.length; i++) {
    const response = await getPosistBrandMenu(
      brands[i].posist_data.customer_key
    )
    console.log(response.data)

    if (!response.data) {
      console.log(response)
    } else {
      //loop through response data
      const menu_data = response.data
      for (let j = 0; j < menu_data.length; j++) {
        // first check if category exists
        let category_data = menu_data[j].category
        let super_meal_category = category_data.superCategory
        // check if super meal category exists, if not create it
        let superMealCategoryToCreate = await SuperMealCategory.query()
          .findOne({
            'posist_data:_id': super_meal_category._id
          })
          .catch(() => false)
        console.log(superMealCategoryToCreate)
        if (superMealCategoryToCreate) {
          superMealCategoryToCreate = await SuperMealCategory.query().patchAndFetchById(
            superMealCategoryToCreate.id,
            {
              name: super_meal_category.superCategoryName,
              posist_data: super_meal_category
            }
          )
        } else {
          superMealCategoryToCreate = await SuperMealCategory.query().insert({
            posist_data: super_meal_category,
            name: super_meal_category.superCategoryName
          })
        }
        //do the same for the meal category
        let mealCategoryToCreate = await MealCategory.query()
          .findOne({
            'posist_data:_id': category_data._id
          })
          .catch(() => false)
        console.log(mealCategoryToCreate)
        if (mealCategoryToCreate) {
          mealCategoryToCreate = await MealCategory.query().patchAndFetchById(
            mealCategoryToCreate.id,
            {
              name: category_data.categoryName,
              super_meal_category_id: superMealCategoryToCreate.id,
              posist_data: category_data
            }
          )
        } else {
          mealCategoryToCreate = await MealCategory.query().insert({
            posist_data: category_data,
            name: category_data.categoryName,
            super_meal_category_id: superMealCategoryToCreate.id,
            meal_category_selection_type_id: meal_category_selection_types[0].id // set default meal category selection type
          })
        }
        //create or update the meal details
        let mealToCreate = await Meal.query()
          .findOne({
            'posist_data:_id': menu_data[j]._id
          })
          .catch(() => false)
        console.log(mealToCreate)
        if (mealToCreate) {
          mealToCreate = await Meal.query().patchAndFetchById(mealToCreate.id, {
            name: menu_data[j].name,
            meal_category_id: mealCategoryToCreate.id,
            posist_data: menu_data[j],
            amount: menu_data[j].rate.toString(),
            is_addon: menu_data[j].isAddOn,
            is_combo: menu_data[j].isCombo,
            brand_id: brands[i].id,
            preparation_time: menu_data[j].preparationTime.time.toString()
          })
        } else {
          mealToCreate = await Meal.query().insert({
            name: menu_data[j].name,
            meal_category_id: mealCategoryToCreate.id,
            amount: menu_data[j].rate.toString(),
            brand_id: brands[i].id,
            posist_data: menu_data[j],
            is_addon: menu_data[j].isAddOn,
            is_combo: menu_data[j].isCombo,
            preparation_time: menu_data[j].preparationTime.time.toString()
          })
        }
        // create addon if meal has addons and isaddon is false
        if (!menu_data[j].isAddOn && menu_data[j].mapItems.length > 0) {
          for (let k = 0; k < menu_data[j].mapItems.length; k++) {
            let mealsAddonToCreate = await Meal.query()
              .findOne({
                'posist_data:_id': menu_data[j].mapItems[k]._id
              })
              .catch(() => false)
            let addon
            console.log(mealsAddonToCreate)
            if (mealsAddonToCreate) {
              addon = await Addon.query()
                .findOne({
                  meal_addon_id: mealsAddonToCreate.id,
                  meal_id: mealToCreate.id
                })
                .catch(() => false)
              //if addon doesn't exist
              if (!addon) {
                addon = await Addon.query().insert({
                  meal_addon_id: mealsAddonToCreate.id,
                  meal_id: mealToCreate.id
                })
              }
            }
          }
        }
      }
    }
  }
})

export default job
