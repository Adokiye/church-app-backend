import { transaction } from 'objection'

import User from '../models/user'
import Role from '../models/role'
import FreeDelivery from '../models/free_delivery'
import UserSetting from '../models/user_setting'
import ReferralCode from '../models/referral_code'

import { encryptPassword } from '../helpers'

export const newCustomerService = async phone_number => {
  const [user] = await Promise.all([
    User.query()
      .insert({
        phone_number,
        role: 'CUSTOMER',
        active: true
      })
  ])

  function makeCode(length) {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

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
    user
  }
}

export const updateNewUserService = async (personal_details, user) => {
  //  clean up data
  if (personal_details.password) {
    personal_details.password = await encryptPassword(personal_details.password)
  }
  const user_data = await User.query()
    .patchAndFetchById(user.id, personal_details)
    

  return {
    user_data
  }
}

export default {
  newCustomerService,
  updateNewUserService
}
