import MealCategory from '../models/meal_category'
import Meal from '../models/meal'
import Addons from '../models/addons'
import MealCategorySelectionType from '../models/meal_category_selection_type'
import User from '../models/user'
import { checkIfMarketing } from '../services/RoleService'
import { Unauthorized, UnprocessableEntity, NotFound } from '../helpers'

export const updateMeal = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  let meal_id = body.meal_id
  delete body.meal_id
  if (await checkIfMarketing(role)) {
    if (body.images) {
      body.images = JSON.stringify(body.images)
    }
    if (body.meal_descriptive_metadatas) {
      body.meal_descriptive_metadatas = JSON.stringify(
        body.meal_descriptive_metadatas
      )
    }
    if (body.meal_business_metadatas) {
      body.meal_business_metadatas = JSON.stringify(
        body.meal_business_metadatas
      )
    }
    if (body.meal_dietary_metadatas) {
      body.meal_dietary_metadatas = JSON.stringify(body.meal_dietary_metadatas)
    }
    if (body.meal_allergy_metadatas) {
      body.meal_allergy_metadatas = JSON.stringify(body.meal_allergy_metadatas)
    }
    if (body.meal_keywords) {
      body.meal_keywords = JSON.stringify(body.meal_keywords)
    }
    const meal_data = await await Meal.query()
      .patchAndFetchById(meal_id, body)
      //  .withGraphFetched('[brand]')
      .catch(e => {
        console.log(e)
        throw UnprocessableEntity('Invalid Body')
      })
    return {
      status: 'success',
      message: 'Meal updated Successfully',
      ...meal_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const getMeals = async ctx => {
  const meals_data = await await Meal.query()
    // .withGraphFetched('[meal_category,brand]')
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'Meals returned Successfully',
    data: meals_data
  }
}

export const getMealAddons = async ctx => {
  const { body } = ctx.request
  let meal_id = body.meal_id
  if(body.by_category){
    const meals_data = await await MealCategory.query()
    .where('addons:meal_id', meal_id)
    .withGraphFetched('[addons, meal_category_selection_type(selectNameAndId)]')
    .modifiers({
      selectNameAndId(builder) {
        builder.select('name', 'id')
      }
    })
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'Addons returned Successfully',
    data: meals_data
  }
  }else{
    const meals_data = await await Addons.query()
    .where('meal_id', meal_id)
    .withGraphJoined('[meal_data.[meal_category.[meal_category_selection_type(selectNameAndId)]]]')
    .modifiers({
      selectNameAndId(builder) {
        builder.select('name', 'id')
      }
    })
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'Addons returned Successfully',
    data: meals_data
  }
  }

}
