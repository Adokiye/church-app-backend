const admin = ['ADMIN', 'SUPER_ADMIN']

const super_admin = ['SUPER_ADMIN']

export const checkIfAdmin = async role_name => admin.includes(role_name)

export const checkIfSuperAdmin = async role_name =>
  super_admin.includes(role_name)

export default {
  checkIfAdmin,
  checkIfSuperAdmin
}
