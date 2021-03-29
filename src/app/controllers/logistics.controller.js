import Cokitchen from '../models/cokitchen'
import LogisticsCompany from '../models/logistics_company'
import User from '../models/user'
import Role from '../models/role'
import {
  checkIfAdmin,
  checkIfLogisticsSuperAdmin,
  checkIfLogisticsAdmin
} from '../services/RoleService'
import { Unauthorized, encryptPassword } from '../helpers'

export const createLogisticsCompany = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (checkIfLogisticsSuperAdmin(role)) {
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
  if (checkIfLogisticsSuperAdmin(role)) {
    body.active = false
    body.role_id = logisticsAdminRole.id
    body.password = await encryptPassword(body.password)
    const logistics_admin_data = await User.query().insert(body)
    return {
      status: 'success',
      message: 'Creation Successful',
      ...logistics_admin_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createLogisticsRider = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  const riderRole = await Role.query().findOne({
    name: 'RIDER'
  })
  if (checkIfLogisticsAdmin(role)) {
    body.active = false
    body.password = await encryptPassword(body.password)
    body.role_id = riderRole.id
    const rider_data = await User.query().insert(body)
    return {
      status: 'success',
      message: 'Creation Successful',
      ...rider_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}
