import { transaction } from 'objection'

import User from '../models/user'
import Role from '../models/role'
import FreeDelivery from '../models/free-delivery'

import { encryptPassword } from '../helpers'

export const newUserService = async (
  phone_number,
) => {
  return await transaction(
    User,
    async (
      User,
    ) => {
      const customerRole = await Role.query().find({
        name:'CUSTOMER',
      });
      const [
        user,
      ] = await Promise.all([
        User.query().insert({
          phone_number,
          role_id: customerRole.id
        }),
      ])

      const free_delivery = await FreeDelivery.query().insert({
        user_id: user.id,
      })

      return {
        user,
        free_delivery,
      }
    }
  )
}

export const updateNewUserService = async (
  personal_details,
  user
) => {
  return await transaction(
    User,
    async (
      User,
    ) => {

      //  clean up data
      delete personal_details.phone_number
      personal_details.password = await encryptPassword(personal_details.password);

      const user_data = await User.query().patchAndFetchById(
        user.id,
        personal_details
      )

      return {
        user_data
      }
    }
  )
}

export default {
  newUserService,
  updatenewUserService,
}
