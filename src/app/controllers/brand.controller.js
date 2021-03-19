import Brand from '../models/brand'
import Cokitchen from '../models/cokitchen'
import CokitchenPolygon from '../models/cokitchen_polygon'
import { checkIfAdmin, checkIfMarketing } from '../services/RoleService'
import { Unauthorized, insidePolygon } from '../helpers'

export const updateBrand = async ctx => {
  const { id } = ctx.params
  const { body } = ctx.request
  const { role } = ctx.state.user

  if (checkIfMarketing(role.name)) {
    if (body.posist_data) {
      delete body.posist_data
    }
    const brand_data = await Brand.query().patchAndFetchById(id, body)
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
    'cokitchen.[brands]'
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
