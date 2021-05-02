import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

export const JWT_SECRET =
  process.env.SECRET || 'fb613016-662f-4ccc-b0e2-135304d8fba9'
export const PORT = process.env.PORT || 3000
export const DATABASE = process.env.DATABASE_URL
export const DATABASE_TEST =
  process.env.DATABASE_TEST ||
  'postgres://USER:PASSWORD@localhost:5432/DATABASE_TEST'

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const URL_FRONT = process.env.URL_FRONT || 'https://getfoodcourt.com'
export const EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || '14d'
export const PAYSTACK_SECRET =
  process.env.PAYSTACK_SECRET ||
  'sk_test_115e129503be252474b3f1e17009dba14246a4cc'
export const APP_KEY = process.env.APP_KEY
export const OTP_TOKEN_EXPIRE = process.env.OTP_TOKEN_EXPIRE
export const CONFIRM_EMAIL_EXPIRE = process.env.CONFIRM_EMAIL_EXPIRE
export const AFRICA_TALKING_USERNAME = process.env.AFRICA_TALKING_USERNAME
export const AFRICA_TALKING_API_KEY = process.env.AFRICA_TALKING_API_KEY

export const POSIST_API_URL = 'http://posistapi.com/api/v1/'
export const POSIST_TOKEN = process.env.POSIST_TOKEN
export const POSIST_CLIENT_ID = process.env.POSIST_CLIENT_ID
export const POSIST_CLIENT_NAME = process.env.POSIST_CLIENT_NAME
