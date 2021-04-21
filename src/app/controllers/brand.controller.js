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

  if (await checkIfMarketing(role)) {
    if (body.posist_data) {
      delete body.posist_data
    }
    const brand_data = await Brand.query().patchAndFetchById(
      body.brand_id,
      body
    )
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
    'cokitchen.[brands.[meals]]'
  )
  var cokitchens = []
  var i = 0,
    len = cokitchen_polygons.length
  while (i < len) {
    if (insidePolygon([lat, lng], cokitchen_polygons[i].polygon)) {
      cokitchens.push(cokitchen_polygons[i].cokitchen)
      return {
        status: 'success',
        data: cokitchen_polygons[i].cokitchen.brands
      }
    }

    i++
  }
}

export const getBrandsForMarketing = async ctx => {
  const brands = await Brand.query().withGraphFetched('[cokitchen, ]')
  return {
    status: 'success',
    data: brands
  }
}
