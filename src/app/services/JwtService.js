import Jwt from 'jsonwebtoken'

const { JWT_SECRET, EXPIRE_TIME } = require('../config')

export default class JwtService {
  static sign(data) {
    return Jwt.sign(data, JWT_SECRET, { expiresIn: EXPIRE_TIME })
  }

  static verify(token) {
    const response = { status: false, message: 'invalid', decoded: { otp: '' } }

    Jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        response.status = false

        if (err.message === 'jwt expired') {
          response.message = 'expired'
        }

        return response
      }
      response.decoded = decoded
      response.status = true
      response.message = 'valid'
      return response
    })

    return response
  }
}
