import { transaction } from 'objection'

import User from '../models/user'
import Role from '../models/role'
import FreeDelivery from '../models/free_delivery'
import UserSetting from '../models/user_setting'
import ReferralCode from '../models/referral_code'
import UserDobUpdated from '../models/user_dob_updated'

import {
  encryptPassword,
  makeCode,
  Unauthorized,
  UnprocessableEntity
} from '../helpers'

export const newCustomerService = async phone_number => {
  const [user] = await Promise.all([
    User.query().insert({
      phone_number,
      role: 'CUSTOMER',
      active: true
    })
  ])

  await createUserSubTables(user)

  return {
    user
  }
}

export const updateNewUserService = async (personal_details, user) => {
  //  clean up data
  if (personal_details.password) {
    personal_details.password = await encryptPassword(personal_details.password)
  }
  if (personal_details.dob) {
    const user_dob_updated = await UserDobUpdated.query()
      .where({
        user_id: user.id
      })
      .catch(() => false)
    if (user_dob_updated) {
      throw UnprocessableEntity('User date of birth can only be changed once')
    } else {
      await UserDobUpdated.query().insert({
        user_id: user.id
      })
    }
  }
  const user_data = await User.query()
    .patchAndFetchById(user.id, personal_details)
    .catch(e => {
      console.log(e)
      throw Unauthorized('User not found please register')
    })

  return {
    user_data
  }
}

export const createUserSubTables = async user => {
  const [free_delivery, user_setting, referral_code] = await Promise.all([
    FreeDelivery.query().insert({
      user_id: user.id
    }),
    UserSetting.query().insert({
      user_id: user.id
    }),
    ReferralCode.query().insert({
      user_id: user.id,
      code: makeCode(6).toUpperCase()
    })
  ])
  return {
    free_delivery,
    user_setting,
    referral_code
  }
}

export default {
  newCustomerService,
  updateNewUserService
}
