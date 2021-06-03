import User from '../models/user'
import Role from '../models/role'
import FreeDelivery from '../models/free_delivery'
import UserSetting from '../models/user_setting'
import ReferralCode from '../models/referral_code'
import JwtService from '../services/JwtService'
import OtpService from '../services/OtpService'
import Otp from '../models/otp'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import {
  newCustomerService,
  updateNewUserService,
  createUserSubTables
} from '../services/UserService'
import {
  checkIfAdmin,
  checkIfMarketingAdmin,
  checkIfMarketing,
  checkIfLogisticsAdmin,
  checkIfRider
} from '../services/RoleService'
import {
  Unauthorized,
  insidePolygon,
  makeCode,
  encryptPassword,
  UnprocessableEntity
} from '../helpers'
import DeviceToken from '../models/device_token'
const status = 'success'
const message = 'Success!'

export const sendOtp = async ctx => {
  const { body } = ctx.request

  await OtpService.sendOtp({
    phone_number: body.phone_number,
    action: body.action
  })

  return {
    status: 'success',
    message: 'Otp sent successfully'
  }
}

export const verifyOtp = async (ctx, next) => {
  const { body } = ctx.request

  if (!body.otp) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: {
        otp: ['otp is required']
      }
    })
  }

  const otpInDb = await Otp.query()
    .findOne({
      phone_number: body.phone_number,
      action: body.action
    })
    .catch(() => false)

  if (!otpInDb) {
    ctx.throw(404, 'no otp has been sent to this number')
  }

  const { status, message, decoded } = JwtService.verify(otpInDb.otp_token)

  if (!status) {
    ctx.throw(400, `otp is ${message}`)
  }

  if (decoded.otp !== body.otp) {
    ctx.throw(400, 'Invalid otp')
  }

  return next()
}

export const create = async ctx => {
  const { phone_number } = ctx.request.body

  let userInDb = await User.query()
    .findOne({
      phone_number
    })

    .catch(() => false)

  if (!userInDb) {
    const userData = await newCustomerService(phone_number)
    return {
      status,
      message,
      ...userData,
      token: JwtService.sign({ user: userData.user })
    }
  } else {
    // set user to active
    userInDb = await User.query().patchAndFetchById(userInDb.id, {
      active: true
    })
    return {
      status,
      message,
      ...userInDb,
      token: JwtService.sign({ user: userInDb })
    }
  }
}

export const update = async ctx => {
  const { body } = ctx.request
  const { user } = ctx.state.user

  const userData = await updateNewUserService(body, user)

  return {
    status: 'success',
    message: 'Update Successful',
    ...userData
  }
}

export const updateDeviceToken = async ctx => {
  const { body } = ctx.request
  const { id } = ctx.state.user.user
  const user = await User.query()
    .findOne({ id })
    .catch(() => {
      throw Unauthorized('User not found please register')
    })

  const userData = await DeviceToken.query()
    .insert({
      user_id: user.id,
      ...body
    })
    .catch(() => {
      throw UnprocessableEntity('Invalid body')
    })

  return {
    status: 'success',
    message: 'Device Token Update Successful',
    ...userData
  }
}

//admin
export const adminUpdateUser = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfAdmin(role)) {
    if (body.password) {
      body.password = await encryptPassword(body.password)
    }
    const user_data = await User.query().patchAndFetchById(body.user_id, body)

    return {
      status: 'success',
      message: 'Update Successful',
      ...user_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

//marketing admin
export const marketingCreateStaff = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketingAdmin(role)) {
    body.role = 'MARKETING'
    body.active = false
    body.password = await encryptPassword(body.password)
    const user_data = await User.query().insert(body)
    return {
      status: 'success',
      message: 'Update Successful',
      ...user_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

//register as marketing
export const registerAsMarketing = async ctx => {
  const { body } = ctx.request

  body.role = 'MARKETING'
  body.active = true
  body.password = await encryptPassword(body.password)
  const user_data = await User.query().insert(body)
  await createUserSubTables(user_data)
  return {
    status: 'success',
    message: 'Registration Successful',
    ...user_data,
    token: JwtService.sign({ user: user_data })
  }
}

//register as logistics admin
export const registerAsLogisticsAdmin = async ctx => {
  const { body } = ctx.request

  body.role = 'LOGISTICS_ADMIN'
  body.active = true
  body.password = await encryptPassword(body.password)
  const user_data = await User.query().insert(body)
  await createUserSubTables(user_data)
  return {
    status: 'success',
    message: 'Registration Successful',
    ...user_data,
    token: JwtService.sign({ user: user_data })
  }
}

export const adminGetUsers = async ctx => {
  const { role } = ctx.state.user.user

  if (await checkIfAdmin(role)) {
    const data = await User.query()
    return {
      status: 'success',
      message: 'Users returned Successfully',
      data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const adminGetUserRoles = async ctx => {
  const { role } = ctx.state.user.user

  if (await checkIfAdmin(role)) {
    const data = await Role.query()
    return {
      status: 'success',
      message: 'Update Successful',
      data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const login = async ctx => {
  const { body } = ctx.request

  const user = await User.query()
    .findOne({
      email: body.email
    })
    .catch(() => {
      throw Unauthorized('User not found. Please sign up')
    })

  const isValid = await bcrypt.compare(body.password, user.password)

  if (!isValid) {
    throw Unauthorized('Unauthorized, invalid password')
  }

  if (!user.active) {
    return {
      status,
      message:
        'User account inactive, please verify your phone number to continue',
      ...user
    }
  } else {
    return {
      status,
      message,
      ...user,
      token: JwtService.sign({ user })
    }
  }
}

export const loginMarketing = async ctx => {
  const { body } = ctx.request

  const user = await User.query()
    .findOne({
      email: body.email
    })

    .catch(() => {
      throw Unauthorized('User not found. Please sign up')
    })

  const isValid = await bcrypt.compare(body.password, user.password)

  if (!isValid) {
    throw Unauthorized('Unauthorized, invalid password')
  }

  if (!user.active) {
    return {
      status,
      message:
        'User account inactive, please verify your phone number to continue',
      ...user
    }
  } else {
    if (await checkIfMarketing(user.role)) {
      return {
        status,
        message,
        ...user,
        token: JwtService.sign({ user })
      }
    } else {
      throw Unauthorized('Unauthorized')
    }
  }
}

export const loginLogisticsAdmin = async ctx => {
  const { body } = ctx.request

  const user = await User.query()
    .findOne({
      email: body.email
    })

    .catch(() => {
      throw Unauthorized('User not found. Please sign up')
    })

  const isValid = await bcrypt.compare(body.password, user.password)

  if (!isValid) {
    throw Unauthorized('Unauthorized, invalid password')
  }

  if (!user.active) {
    return {
      status,
      message:
        'User account inactive, please verify your phone number to continue',
      ...user
    }
  } else {
    if (await checkIfLogisticsAdmin(user.role)) {
      return {
        status,
        message,
        ...user,
        token: JwtService.sign({ user })
      }
    } else {
      throw Unauthorized('Unauthorized')
    }
  }
}

export const loginRider = async ctx => {
  const { body } = ctx.request

  const user = await User.query()
    .findOne({
      email: body.email
    })

    .catch(() => {
      throw Unauthorized('User not found. Please sign up')
    })

  const isValid = await bcrypt.compare(body.password, user.password)

  if (!isValid) {
    throw Unauthorized('Unauthorized, invalid password')
  }

  if (!user.active) {
    return {
      status,
      message:
        'User account inactive, please verify your phone number to continue',
      ...user
    }
  } else {
    if (await checkIfRider(user.role)) {
      return {
        status,
        message,
        ...user,
        token: JwtService.sign({ user })
      }
    } else {
      throw Unauthorized('Unauthorized')
    }
  }
}

export const verifyUser = async ctx => {
  const { body } = ctx.request
  body.active = true
  const user_data = await User.query().patchAndFetchById(body.user_id, body)

  return {
    status,
    message,
    ...user_data,
    token: JwtService.sign({ user })
  }
}

export const findUserName = async ctx => {
  const { body } = ctx.request

  const user = await User.query()
    .findOne({
      username: body.username
    })
    .catch(() => false)

  if (!user) {
    return {
      status,
      message: 'Username available',
      ...user
    }
  } else {
    throw UnprocessableEntity('Username not available')
  }
}

export const me = async ctx => {
  const { user } = ctx.state.user

  const user_data = await User.query()
    .findOne({
      id: user.id
    })
    .withGraphFetched('[free_deliveries, referral_code]')
    .catch(e => {
      console.log(e)
      return false
    })

  if (!user_data) {
    throw Unauthorized('User not found. Please sign up')
  } else {
    return {
      status,
      message: 'User data gotten successfully',
      ...user_data
    }
  }
}

export const getAllUsers = async ctx => {
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const user_data = await User.query().catch(e => {
      console.log(e)
      return []
    })
    return {
      status,
      message: 'Users gotten successfully',
      data: user_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}
