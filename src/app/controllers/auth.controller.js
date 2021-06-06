import User from '../models/user'
import Role from '../models/role'
import JwtService from '../services/JwtService'
import OtpService from '../services/OtpService'
import Otp from '../models/otp'
import bcrypt from 'bcryptjs'
import {
  Unauthorized,
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
  ctx.request.body.password = await encryptPassword(ctx.request.body.password)

  const {
    phone_number,
    email,
    first_name,
    last_name,
    other_name,
    user_gender,
    password,
    address,
    marital_status,
    employment_status,
    educational_background,
    baptismal_status,
    role
  } = ctx.request.body

  let userInDb = await User.query()
    .findOne({
      phone_number
    })

    .catch(() => false)

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

  if (!userInDb) {
    const userData = await await User.query()
      .insert({
        email,
        first_name,
        last_name,
        other_name,
        user_gender,
        password,
        address,
        marital_status,
        employment_status,
        educational_background,
        baptismal_status,
        role,
        member_code: random(100000, 999999).toString()
      })

      .catch(e => {
        console.log(e)
        throw UnprocessableEntity('Ivalid Body')
      })
    return {
      status,
      message,
      ...userData,
      token: JwtService.sign({ user: userData.user })
    }
  } else {
    throw UnprocessableEntity('User already exists')
  }
}

export const update = async ctx => {
  const { body } = ctx.request
  const { user } = ctx.state.user

  const user_data = await User.query().patchAndFetchById(user.id, body)

  return {
    status: 'success',
    message: 'Update Successful',
    ...user_data
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

  return {
    status,
    message,
    ...user,
    token: JwtService.sign({ user })
  }
}

export const me = async ctx => {
  const { user } = ctx.state.user

  const user_data = await User.query()
    .findOne({
      id: user.id
    })
    //  .withGraphFetched('[free_deliveries, referral_code]')
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

