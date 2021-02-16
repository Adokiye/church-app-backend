import Otp from '../models/otp';
import JwtService from '../services/JwtService';
import OtpService from '../services/OtpService';

export default class OtpController {
  async sendOtp(  req,res,next ) {
    const body = req.body;

    await OtpService.sendOtp({
      phone_number: body.phone_number,
      action: body.action,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Otp sent successfully',
    });
  }

  async verifyOtp( res, req,next) {
    const body = req.body;

    if (!body.otp) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation Error',
        errors: {
          otp: ['otp is required'],
        },
      });
    }

    const otpInDb = await Otp.query().where({
      phone_number: body.phone_number,
      action: body.action,
    });

    if (!otpInDb) {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          phone_number: ['no otp has been sent to this number'],
        },
      });
    }

    const { status, message, decoded } = JwtService.verify(otpInDb.otp_token);

    if (!status) {
      return res.status(422).json({
        status: 'error',
        message: `otp is ${message}`,
      });
    }

    if (decoded.otp !== body.otp) {
      return res.status(422).json({
        status: 'error',
        message: 'Invalid otp',
      });
    }
    
    return next();
  }
}
