import User from '../models/user'
import Role from '../models/role'
import JwtService from '../services/JwtService'
import OtpService from '../services/OtpService'
import Otp from '../models/otp'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import {
  newCustomerService,
  updateNewUserService
} from '../services/UserService'
import { checkIfAdmin, checkIfMarketingAdmin } from '../services/RoleService'

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
    .where({
      phone_number: body.phone_number,
      action: body.action
    })
    .catch(() => false)

  if (otpInDb) {
    ctx.throw(404, 'NOT FOUND', {
      errors: {
        phone_number: ['no otp has been sent to this number']
      }
    })
  }

  const { status, message, decoded } = JwtService.verify(otpInDb.otp_token)

  if (!status) {
    ctx.throw(400, `otp is ${message}`)
  }

  if (decoded.otp !== body.otp) {
    return {
      status: 'error',
      message: 'Invalid otp'
    }
  }

  return next()
}

export const create = async ctx => {
  const { phone_number } = ctx.request.body

  const userInDb = await User.query()
    .where({
      phone_number
    })
    .withGraphFetched('[role]')
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
    return {
      status,
      message,
      ...userInDb,
      token: JwtService.sign({ ...userData.user })
    }
  }
}

export const update = async ctx => {
  const { personal_details } = ctx.request.body
  const { id } = ctx.state.user

  const [user] = await User.query()
    .where({ id })
    .catch(() => {
      throw Unauthorized('User not found please register')
    })

  const userData = await updateNewUserService(personal_details, user)

  return {
    status: 'success',
    message: 'Update Successful',
    ...userData
  }
}

//admin
export const adminUpdateUser = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user

  if (checkIfAdmin(role.name)) {
    if (body.password) {
      body.password = await encryptPassword(body.password)
    }
    const user_data = await User.query()
      .patchAndFetchById(body.user_id, body)
      .withGraphFetched('[role]')
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
  const { role } = ctx.state.user

  if (checkIfMarketingAdmin(role.name)) {
    const marketing = await Role.query().find({
      name: 'MARKETING'
    })
    body.role_id = marketing.role_id
    body.active = false
    body.password = await encryptPassword(body.password)
    const user_data = await User.query().insert(body).withGraphFetched('[role]')
    return {
      status: 'success',
      message: 'Update Successful',
      ...user_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const adminGetUsers = async ctx => {
  const { role } = ctx.state.user

  if (checkIfAdmin(role.name)) {
    const data = await User.query().withGraphFetched('[role]')
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
  const { role } = ctx.state.user

  if (checkIfAdmin(role.name)) {
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
      token: JwtService.sign({ ...user })
    }
  }
}

export const verifyUser = async ctx => {
  const { body } = ctx.request
  body.active = true
  const user_data = await User.query()
    .patchAndFetchById(body.user_id, body)
    .withGraphFetched('[role]')
  return {
    status,
    message,
    ...user_data,
    token: JwtService.sign({ ...user })
  }
}
