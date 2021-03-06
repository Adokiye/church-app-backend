import User from '../models/user';
import Role from '../models/role';
import JwtService from '../services/JwtService';
import OtpService from '../services/OtpService';
import {newCustomerService,updateNewUserService} from '../services/UserService'
import {
  checkIfAdmin,
  checkIfMarketing
} from '../services/RoleService'

export const sendOtp = async ctx => {
  const { body } = ctx.request

    await OtpService.sendOtp({
      phone_number: body.phone_number,
      action: body.action,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Otp sent successfully',
    });
  }

  export const verifyOtp = async (ctx,next) => {
    const { body } = ctx.request

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

  export const create = async ctx => {
    const {
      phone_number,
    } = ctx.request.body

    const status =  'success';
    const message = 'Success!';

    const userInDb = await User.query().where({
      phone_number,
    }).withGraphFetched('[role]');

    if (!userInDb) {
      const userData = await newCustomerService(
        phone_number,
      )
      return {
        status,
        message,
        ...userData,
        token: JwtService.sign(
          { user: userData.user},
        )
      }
    }else{
      return {
      status,
      message,
      ...userInDb,
      token: JwtService.sign(
        {  ...userData.user},
      )
    }
    }
  }

  export const update = async ctx => {
    const {
      personal_details,
    } = ctx.request.body
    const { id } = ctx.state.user
  
    const [user] = await User.query()
      .where({ id })
      .catch(() => {
        throw Unauthorized('User not found please register')
      })
  
    const userData = await updateNewUserService(
      personal_details,
      user
    )
  
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
    
      const user_data = await User.query().patchAndFetchById(
        body.user_id,
        body
      ).withGraphFetched('[role]')
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
        message: 'Update Successful',
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



