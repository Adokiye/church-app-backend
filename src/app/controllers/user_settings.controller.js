import UserSetting from '../models/user_setting'
import UserSavedAddress from '../models/user_saved_address'
import { Unauthorized, UnprocessableEntity } from '../helpers'

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
    .catch(e => {
      console.log(e)
      return false
    })
  if (!user_settings_data) {
    throw Unauthorized('User Settings data not found.')
  } else {
    return {
      status: 'success',
      message: "User's Settings data updated Successfully",
      ...user_settings_data
    }
  }
}

// user address setting save
export const getSavedAddress = async ctx => {
  const { user } = ctx.state.user

  const user_saved_address_data = await UserSavedAddress.query()
    .where({
      user_id: user.id
    })
    .catch(() => false)
  if (!user_saved_address_data) {
    throw Unauthorized('User not found. Please sign up')
  } else {
    return {
      status: 'success',
      message: "User's Saved address data returned Successfully",
      data: user_saved_address_data
    }
  }
}

export const createNewAddress = async ctx => {
  const { user } = ctx.state.user
  const { body } = ctx.request
  let name = body.name.toLowerCase()
  delete body.name
  let user_saved_address_data = await UserSavedAddress.query()
    .findOne({
      user_id: user.id,
      name
    })
    .catch((e) => {console.log(e);false})

  if (user_saved_address_data) {
    throw UnprocessableEntity('Address name already exists for ' + name)
  } else {
    user_saved_address_data = await UserSavedAddress.query()
      .insert({
        user_id: user.id,
        name,
        ...body
      })
      .catch(() => {
        throw UnprocessableEntity('Invalid body')
      })
      return {
        status: 'success',
        message: "User's Address created Successfully",
        ...user_saved_address_data
      }
  }
}

export const updateAddress = async ctx => {
  const { user } = ctx.state.user
  const { body } = ctx.request
  body.user_id = user.id
  const user_saved_address_data = await UserSavedAddress.query()
    .patchAndFetchById(body.user_saved_address_id, body)
    .catch(() => false)

  if (!user_saved_address_data) {
    throw Unauthorized('User Saved address data not found.')
  } else {
    return {
      status: 'success',
      message: "User's Saved Address data updated Successfully",
      ...user_saved_address_data
    }
  }
}

export const deleteAddress = async ctx => {
  const { user } = ctx.state.user
  const { params } = ctx
  const user_saved_address_data = await UserSavedAddress.query()
    .deleteById(params.id)
    .catch(() => {
      throw NotFound('User saved address with id '+params.id+' not found')
    })
    return {
      status: 'success',
      message: 'User saved address Deleted Successfully',
    }
}
