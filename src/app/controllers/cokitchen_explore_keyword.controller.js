import CokitchenExploreKeyword from '../models/cokitchen_explore_keyword'
import MealKeyword from '../models/meal_keyword'
import User from '../models/user'
import { checkIfMarketing } from '../services/RoleService'
import { Unauthorized, NotFound, UnprocessableEntity } from '../helpers'

export const createCokitchenExploreKeyword = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  if (await checkIfMarketing(role)) {
    //first check if meal keyword has images as that is required for explore
    const meal_keyword_data = await MealKeyword.query()
      .findOne({
        id: body.meal_keyword_id
      })
      .catch(e => {})
    if (
      meal_keyword_data.images != null &&
      meal_keyword_data.images.length > 0
    ) {
      // check if cokitchen explore keyword with that data alreadye exists
      let cokitchen_explore_keyword_data = await CokitchenExploreKeyword.query()
        .findOne({
          cokitchen_id: body.cokitchen_id,
          meal_keyword_id: body.meal_keyword_id
        })
        //.withGraphFetched('[cokitchen, meal_keyword]')
        .catch(e => {
          console.log(e)
          return false
        })
        if(cokitchen_explore_keyword_data){
          throw UnprocessableEntity('Invalid body, explore data already exists')

        }
      cokitchen_explore_keyword_data = await CokitchenExploreKeyword.query()
        .insert(body)
        //.withGraphFetched('[cokitchen, meal_keyword]')
        .catch(e => {
          console.log(e)
          throw UnprocessableEntity('Invalid body ' + e)
        })
      return {
        status: 'success',
        message: 'Cokitchen explore keyword created Successfully',
        ...cokitchen_explore_keyword_data
      }
    } else {
      throw UnprocessableEntity(
        'Meal keyword needs to have an image before it can be made a cokitchen explore keyword'
      )
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const getCokitchenExploreKeywords = async ctx => {
  const cokitchen_explore_keywords = await CokitchenExploreKeyword.query()
    .withGraphFetched('[meal_keyword]')
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'Cokitchen explore keywords returned Successfully',
    data: cokitchen_explore_keywords
  }
}

export const deleteCokitchenExploreKeyword = async ctx => {
  const { params } = ctx
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const cokitchen_explore_keyword_data = await CokitchenExploreKeyword.query()
      .deleteById(params.id)
      .catch(() => {
        throw NotFound('Cokitchen explore keyword not found')
      })
    return {
      status: 'success',
      message: 'Cokitchen explore keyword Deleted Successfully'
    }
  } else {
    throw Unauthorized('Unauthorized Delete')
  }
}
