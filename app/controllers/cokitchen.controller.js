import Cokitchen from '../models/cokitchen'
import CokitchenPolygon from '../models/cokitchen_polygon'
import {
  checkIfAdmin,
  checkIfMarketing
} from '../services/RoleService'
import { Unauthorized } from '../helpers'

export const updateCokitchen = async ctx => {
  const { id } = ctx.params
  const { body } = ctx.request
  const { role } = ctx.state.user

  if (checkIfMarketing(role.name)) {
    if (body.posist_data) {
      delete body.posist_data
    }
    const cokitchen_data = await Cokitchen.query().patchAndFetchById(
      id,
      body
    ).withGraphFetched('[brands, cokitchen_polygon]')
    return {
      status: 'success',
      message: 'Update Successful',
      ...cokitchen_data
    }
  } else {
    throw Unauthorized('Unauthorized Update')
  }
}

export const createCokitchenPolygon = async ctx => {
    const { body } = ctx.request
    const { id, role } = ctx.state.user
  
    if (checkIfMarketing(role.name)) {
      const cokitchen_polygon_data = await CokitchenPolygon.query().insert(
        ...body
      ).withGraphFetched('[cokitchen]')
      return {
        status: 'success',
        message: 'Update Successful',
        ...cokitchen_polygon_data
      }
    } else {
      throw Unauthorized('Unauthorized')
    }
  }

export const updateCokitchenPolygon = async ctx => {
    const { id } = ctx.params
    const { body } = ctx.request
    const { role } = ctx.state.user
  
    if (checkIfMarketing(role.name)) {
      const cokitchen_polygon_data = await CokitchenPolygon.query().patchAndFetchById(
        id,
        body
      ).withGraphFetched('[cokitchen]')
      return {
        status: 'success',
        message: 'Update Successful',
        ...cokitchen_polygon_data
      }
    } else {
      throw Unauthorized('Unauthorized Update')
    }
  }

export const getAllCokitchen = async ctx =>{
    const cokitchens = await Cokitchen.query().withGraphFetched('[brands,cokitchen_polygons]')
    return {
      status: 'success',
      cokitchens
    }
}
