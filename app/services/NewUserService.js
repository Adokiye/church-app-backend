import { transaction } from 'objection'

import User from '../models/user'
import FreeDelivery from '../models/free-deliveries'

export const newUserService = async (
  phone_number,
) => {
  return await transaction(
    User,
    async (
      User,
    ) => {
      const [
        user,
      ] = await Promise.all([
        User.query().insert({
          phone_number:phone_number
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

export const updatenewUserService = async (
  personal_details,
  user
) => {
  return await transaction(
    User,
    async (
      User,
    ) => {

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
  updatenewUserService
}
