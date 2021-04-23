import Brand from '../models/brand'
import Cokitchen from '../models/cokitchen'
import CokitchenPolygon from '../models/cokitchen_polygon'
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
  if (await checkIfMarketing(role)) {
    if (body.images) {
      body.images = JSON.stringify(body.images)
    }
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
  const cokitchen_polygons = await CokitchenPolygon.query().withGraphFetched(
    '[cokitchen.[brands.[meals],cokitchen_explore_keywords]]'
  )
  var cokitchens = []
  var i = 0,
    len = cokitchen_polygons.length
  while (i < len) {
    if (insidePolygon([lat, lng], cokitchen_polygons[i].polygon)) {
      cokitchens.push(cokitchen_polygons[i].cokitchen)
      return {
        status: 'success',
        data: cokitchen_polygons[i].cokitchen.brands,
        cokitchen_explore_keywords:
          cokitchen_polygons[i].cokitchen.cokitchen_explore_keywords
      }
    }

    i++
  }
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
