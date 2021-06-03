import Cokitchen from '../models/cokitchen'
import LogisticsCompany from '../models/logistics_company'
import User from '../models/user'
import Role from '../models/role'
import {
  checkIfAdmin,
  checkIfLogisticsSuperAdmin,
  checkIfLogisticsAdmin
} from '../services/RoleService'
import { createUserSubTables } from '../services/UserService'
import { Unauthorized, encryptPassword, UnprocessableEntity } from '../helpers'

export const createLogisticsCompany = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfLogisticsSuperAdmin(role)) {
    const logistics_company_data = await LogisticsCompany.query().insert(body)
    return {
      status: 'success',
      message: 'Creation Successful',
      ...logistics_company_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createLogisticsAdmin = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  const logisticsAdminRole = await Role.query().findOne({
    name: 'LOGISTICS_ADMIN'
  })
  if (await checkIfLogisticsSuperAdmin(role)) {
    body.active = false
    body.role_id = logisticsAdminRole.id
    body.password = await encryptPassword(body.password)
    const logistics_admin_data = await User.query().insert(body)
    await createUserSubTables(logistics_admin_data)

    return {
      status: 'success',
      message: 'Creation Successful',
      ...logistics_admin_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createLogisticsSuperAdmin = async ctx => {
  const { body } = ctx.request
  const logisticsAdminRole = await Role.query().findOne({
    name: 'LOGISTICS_SUPER_ADMIN'
  })
  body.active = false
  body.role_id = logisticsAdminRole.id
  body.password = await encryptPassword(body.password)
  const logistics_admin_data = await User.query()
    .insert(body)
    .catch(e => {
      console.log(e)
      throw UnprocessableEntity('Invalid Body')
    })
  await createUserSubTables(logistics_admin_data)

  return {
    status: 'success',
    message: 'Creation Successful',
    ...logistics_admin_data
  }
}

export const createLogisticsRider = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  const riderRole = await Role.query().findOne({
    name: 'RIDER'
  })
  if (await checkIfLogisticsAdmin(role)) {
    body.active = false
    body.password = await encryptPassword(body.password)
    body.role_id = riderRole.id
    const rider_data = await User.query().insert(body)
    await createUserSubTables(rider_data)
    return {
      status: 'success',
      message: 'Creation Successful',
      ...rider_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}
