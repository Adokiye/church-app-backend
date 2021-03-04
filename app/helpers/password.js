import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const {
  JWT_SECRET,
  OTP_TOKEN_EXPIRE,
  CONFIRM_EMAIL_EXPIRE
} = require('../config')

export const encryptPassword = (password, length = 10) =>
  bcrypt.hash(password, length)

export const generateOTPToken = tokenData =>
  jwt.sign(tokenData, JWT_SECRET, { expiresIn: OTP_TOKEN_EXPIRE || '10m' })

export const generateConfirmEmailToken = tokenData =>
  jwt.sign(tokenData, JWT_SECRET, { expiresIn: CONFIRM_EMAIL_EXPIRE || '1d' })
