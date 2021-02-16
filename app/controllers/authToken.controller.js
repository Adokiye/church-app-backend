import AuthToken from '../models/authToken';
import JwtService from '../services/JwtService';

export default class AuthTokenController {
  async create(  req,res,next ) {
    const body = req.body;

    await OtpService.sendOtp({
      phone_number: body.phone_number,
      action: body.action,
    });
    await AuthToken.query().insert({
        body,
        action,
        otp_token: JwtService.sign(
          { phone_number, otp, action },
          { expiresIn: process.env.OTP_EXPIRATION || "10m" }
        ),
      });

    return res.status(200).json({
      status: 'success',
      message: 'Otp sent successfully',
    });
  }
}
