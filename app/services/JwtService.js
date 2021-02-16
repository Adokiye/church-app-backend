import Jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export default class JwtService {
  static sign(data, options) {
    return Jwt.sign(data, SECRET_KEY, options);
  }

  static verify(token) {
    const response = { status: false, message: 'invalid', decoded: { otp: '' } };

    Jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        response.status = false;

        if (err.message === 'jwt expired') {
          response.message = 'expired';
        }

        return response;
      }

      response.decoded = decoded;
      response.status = true;
      response.message = 'valid';
      return response;
    });

    return response;
  }
}
