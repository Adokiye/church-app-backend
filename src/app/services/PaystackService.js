import User from '../models/user'
import UserCard from '../models/user_card'
import { createOrder } from '../controllers/order.controller'
import { NotFound, UnprocessableEntity } from '../helpers'
import { transaction } from 'objection'
import {
  createTransactionForOrder,
  createTransactionForWallet
} from './TransactionService'
import axios from 'axios'

/**
 * Handle Charge Success
 */
// paystack/webhook
export const handle = async data => {
  const { email, phone_number, order, body } = data.customer

  // get user details
  const user = await User.query()
    .where('phone_number', phone_number)
    .limit(1)
    .first()
    .catch(e => {
      console.log(e)
      throw NotFound('User not found')
    })

  // create transaction if order true, else add amount to wallet if order false
  if (order) {
    await createTransactionForOrder(
      'Transfer',
      'Debit',
      data.amount,
      user.id,
      'Order Payment by Card',
      'Order Payment by Card'
    )
  } else {
    await createTransactionForWallet(
      'Deposit',
      'Credit',
      data.amount,
      user.id,
      `Deposit of ₦${data.amount}`,
      `Deposit of ₦${data.amount}`
    )
  }
  console.log('before card')
  // save card
  await UserCard.query()
    .insert({
      userId: user.id,
      auth: data.authorization.authorization_code,
      lastFourDigit: data.authorization.last4,
      status: true,
      countryCode: data.authorization.country_code,
      expiryMonth: data.authorization.exp_month,
      expiryYear: data.authorization.exp_year,
      signature: data.authorization.signature,
      bank: data.authorization.bank,
      reusable: data.authorization.reusable,
      cardName: data.authorization.card_type
    })
    .catch(e => {
      console.log(e)
      throw UnprocessableEntity('Invalid Body')
    })

  // create order if true
  if (order) {
    let ctx = {
      request: {
        body: JSON.parse(body)
      },
      state: {
        user: user
      }
    }
    console.log(ctx)
    await createOrder(ctx)
  }
}

export const chargeCard = data => {
  const { card, amount } = data
}

/* istanbul ignore file */

// import axios from 'axios';
// import Env from '@ioc:Adonis/Core/Env';
// import { NotFound } from '../helpers';

// const paystackToken = Env.get('PAYSTACK_SECRET_KEY');

// /**
//  * Charge Authorization
//  */
// export default class ChargeAuthorization {
//   /**
//    * charge
//    */
//   static async charge(data) {
//     try {
//       const response = await axios({
//         method: 'post',
//         url: 'https://api.paystack.co/transaction/charge_authorization',
//         data,
//         headers: {
//           'Authorization': `Bearer ${paystackToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       return {
//         status: response.data.data.status,
//         amount: response.data.data.amount,
//         reference: response.data.data.reference,
//         authorization: response.data.data.authorization,
//       };
//     } catch (error) {
//       return {
//         status: error.response.data.status,
//         message: error.response.data.message,
//       };
//     }
//   }
// }
