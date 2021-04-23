import Cokitchen from '../models/cokitchen'
import Meal from '../models/meal'
import CokitchenPolygon from '../models/cokitchen_polygon'
import { checkIfAdmin, checkIfMarketing } from '../services/RoleService'
import { Unauthorized, UnprocessableEntity } from '../helpers'

export const createCokitchen = async ctx => {
  const { id } = ctx.params
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    if (body.posist_data) {
      delete body.posist_data
    }
    const cokitchen_data = await Cokitchen.query()
      .insert(body)
      .catch(e => {
        console.log(e)
        throw UnprocessableEntity('Invalid body')
      })
    return {
      status: 'success',
      message: 'Creation Successful',
      ...cokitchen_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const updateCokitchen = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  let cokitchen_id = body.cokitchen_id
  delete body.cokitchen_id
  if (await checkIfMarketing(role)) {
    if (body.images) {
      body.images = JSON.stringify(body.images)
    }

    const cokitchen_data = await Cokitchen.query()
      .patchAndFetchById(cokitchen_id, body)
      .withGraphFetched('[brands]')
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
  const { id, role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    if (body.polygon) {
      body.polygon = JSON.stringify(body.polygon)
    }
    const cokitchen_polygon_data = await CokitchenPolygon.query()
      .insert(body)
      .catch(e => {
        console.log(e)
        throw UnprocessableEntity('Invalid Body')
      })
    //  .withGraphFetched('[cokitchen]')
    return {
      status: 'success',
      message: 'Creation of cokitchen polygon Successful',
      ...cokitchen_polygon_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const updateCokitchenPolygon = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  const cokitchen_polygon_id = body.cokitchen_polygon_id
  delete body.cokitchen_polygon_id
  if (await checkIfMarketing(role)) {
    if (body.polygon) {
      body.polygon = JSON.stringify(body.polygon)
    }
    const cokitchen_polygon_data = await CokitchenPolygon.query()
      .patchAndFetchById(cokitchen_polygon_id, body)
      .withGraphFetched('[cokitchen]')
    return {
      status: 'success',
      message: 'Update Successful',
      ...cokitchen_polygon_data
    }
  } else {
    throw Unauthorized('Unauthorized Update')
  }
}

export const deleteCokitchenPolygon = async ctx => {
  const { params } = ctx
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    await CokitchenPolygon.query()
      .deleteById(params.id)
      .catch(() => {
        throw NotFound('Cokitchen polygon not found')
      })
    return {
      status: 'success',
      message: 'Cokitchen polygon Deleted Successfully'
    }
  } else {
    throw Unauthorized('Unauthorized Delete')
  }
}

export const getAllCokitchens = async ctx => {
  const cokitchens = await Cokitchen.query()
    .withGraphFetched('[brands.[meals],cokitchen_explore_keywords, cokitchen_polygons]')
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    cokitchens
  }
}
