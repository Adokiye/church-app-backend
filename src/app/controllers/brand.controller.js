import Brand from '../models/brand'
import Cokitchen from '../models/cokitchen'
import CokitchenPolygon from '../models/cokitchen_polygon'
import MealCategory from '../models/meal_category'
import { checkIfAdmin, checkIfMarketing } from '../services/RoleService'
import { Unauthorized, insidePolygon, UnprocessableEntity } from '../helpers'

export const createBrand = async ctx => {
  const { id } = ctx.params
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    if (body.images) {
      body.images = JSON.stringify(body.images)
    }
    const brand_data = await Brand.query()
      .insert(body)
      .catch(e => {
        console.log(e)
        throw UnprocessableEntity('Invalid body')
      })
    return {
      status: 'success',
      message: 'Brand Created Successfully',
      ...brand_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const updateBrand = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  const brand_id = body.brand_id
  delete body.brand_id
  if (body.images) {
    body.images = JSON.stringify(body.images)
  }
  if (body.brand_descriptive_metadatas) {
    body.brand_descriptive_metadatas = JSON.stringify(
      body.brand_descriptive_metadatas
    )
  }
  if (body.brand_business_metadatas) {
    body.brand_business_metadatas = JSON.stringify(
      body.brand_business_metadatas
    )
  }
  if (body.brand_keywords) {
    body.brand_keywords = JSON.stringify(body.brand_keywords)
  }
  if (await checkIfMarketing(role)) {
    if (body.posist_data) {
      delete body.posist_data
    }
    const brand_data = await Brand.query().patchAndFetchById(brand_id, body)
    return {
      status: 'success',
      message: 'Update Successful',
      ...brand_data
    }
  } else {
    throw Unauthorized('Unauthorized Update')
  }
}

export const getBrandsForCustomer = async ctx => {
  const { body } = ctx.request
  const { lat, lng } = body
  const cokitchen_polygons = await CokitchenPolygon.query()
    // .withGraphFetched('[cokitchen.[brands.[meals],cokitchen_explore_keywords]]')
    .catch(e => {
      console.log(e)
      throw UnprocessableEntity('Invalid Body')
    })
  var i = 0,
    len = cokitchen_polygons.length
  while (i < len) {
    if (insidePolygon([lat, lng], cokitchen_polygons[i].polygon)) {
      // get cokitchen --> to be changed
      const [cokitchens, meal_categories] = await Promise.all([
        Cokitchen.query()
          .where('cokitchens.id', cokitchen_polygons[i].cokitchen_id)

          .withGraphJoined(
            '[brands.[meals.[meal_category.[meal_category_selection_type(selectNameAndId)]]],cokitchen_explore_keywords.[meal_keyword], cokitchen_polygons]'
          )

          .where('brands:meals.is_addon', false)
          .modifiers({
            selectNameAndId(builder) {
              builder.select('name', 'id')
            }
          })
          .catch(e => {
            console.log(e)
            return []
          }),
        MealCategory.query()
          .withGraphFetched('[meal_category_selection_type]')
          .catch(e => {
            console.log(e)
            return []
          })
      ])
      return {
        status: 'success',
        data: cokitchens[0].brands,
        cokitchen_explore_keywords: cokitchens[0].cokitchen_explore_keywords,
        meal_categories: meal_categories
      }
    }
    i++
  }
  throw UnprocessableEntity('Invalid Latitude and Longitude')
}

export const getBrandsForMarketing = async ctx => {
  const brands = await Brand.query()
    .withGraphFetched('[cokitchen,meals]')
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    data: brands
  }
}
