import { transaction } from 'objection'

import Role from '../models/role'

// users that can carry out marketing tasks
const marketing = ['MARKETING','ADMIN'];

const admin = ['ADMIN'];

// users that can carry out logisitcs admin tasks
const logisitcsAdmin = ['LOGISTICS_ADMIN', 'ADMIN']

const 

export const checkIfMarketing = async (
  role_name,
) => marketing.includes(role_name)


export const checkIfAdmin = async (
    role_name,
  ) => admin.includes(role_name)

  export const checkIfLogisticsAdmin = async (
    role_name,
  ) => logisitcsAdmin.includes(role_name)

export default {
  checkIfAdmin,
  checkIfLogisticsAdmin,
  checkIfMarketing
}
