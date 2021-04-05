import UserSetting from '../models/user_setting'
import { Unauthorized } from '../helpers'

export const getUserSettings = async ctx => {
  const { user } = ctx.state.user

  const user_settings_data = await UserSetting.query()
    .findOne({
      user_id: user.id
    })
    .catch(() => false)
  if (!user_settings_data) {
    throw Unauthorized('User not found. Please sign up')
  } else {
    return {
      status: 'success',
      message: "User's Settings data returned Successfully",
      ...user_settings_data
    }
  }
}

export const updateUserSettings = async ctx => {
  const { user } = ctx.state.user
  const { body } = ctx.request
  const user_settings_id = body.user_settings_id
  delete body.user_settings_id
  const user_settings_data = await UserSetting.query()
    .patchAndFetchById(user_settings_id, body)
    .catch((e) => {console.log(e); return false;})
  if (!user_settings_data) {
    throw Unauthorized('User Settings data not found. Please sign up')
  } else {
    return {
      status: 'success',
      message: "User's Settings data updated Successfully",
      ...user_settings_data
    }
  }
}
