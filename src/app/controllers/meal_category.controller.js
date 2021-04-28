import MealCategory from '../models/meal_category'
import MealCategorySelectionType from '../models/meal_category_selection_type'
import User from '../models/user'
import { checkIfMarketing } from '../services/RoleService'
import { Unauthorized, UnprocessableEntity, NotFound } from '../helpers'

export const updateMealCategory = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  let meal_category_id = body.meal_category_id
  delete body.meal_category_id
  if (await checkIfMarketing(role)) {
    if(body.images){
      body.images = JSON.stringify(body.images)
    }
    
    const meal_category_data = await await MealCategory.query()
      .patchAndFetchById(meal_category_id, body)
      .withGraphFetched('[selection_type]')
      .catch(e => {
        console.log(e)
        throw UnprocessableEntity('Invalid Body')
      })
    return {
      status: 'success',
      message: 'Meal category updated Successfully',
      ...meal_category_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const getMealCategories = async ctx => {
  const meal_category_data = await await MealCategory.query()
    .withGraphFetched('[meal_category_selection_type]')
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'Meal categories returned Successfully',
    data: meal_category_data
  }
}

export const getMealCategorySelectionTypes = async ctx => {
  const meal_category_selection_type_data = await await MealCategorySelectionType.query()
  //  .withGraphFetched('[meal_categories]')
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'Meal category selection types returned Successfully',
    data: meal_category_selection_type_data
  }
}
