// users that can carry out marketing tasks
const marketing = ['MARKETING', 'ADMIN', 'MARKETING_ADMIN']

const marketingAdmin = ['ADMIN', 'MARKETING_ADMIN']

const admin = ['ADMIN']

// users that can carry out logisitcs admin tasks
const logisitcsAdmin = ['LOGISTICS_ADMIN', 'LOGISTICS_SUPER_ADMIN', 'ADMIN']

//users that can carry out logistics super admin tasks
const logisticsSuperAdmin = ['LOGISTICS_SUPER_ADMIN', 'ADMIN']

export const checkIfMarketing = async role_name => marketing.includes(role_name)

export const checkIfMarketingAdmin = async role_name =>
  marketingAdmin.includes(role_name)

export const checkIfAdmin = async role_name => admin.includes(role_name)

export const checkIfLogisticsAdmin = async role_name =>
  logisitcsAdmin.includes(role_name)

export const checkIfLogisticsSuperAdmin = async role_name =>
  logisticsSuperAdmin.includes(role_name)

export default {
  checkIfAdmin,
  checkIfLogisticsAdmin,
  checkIfMarketing,
  checkIfLogisticsSuperAdmin,
  checkIfMarketingAdmin
}
