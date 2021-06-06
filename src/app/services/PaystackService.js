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
import { PAYSTACK_SECRET } from '../config'

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
      `Order Payment of ₦${data.amount} by Card`,
      `Order Payment of ₦${data.amount} by Card`
    )
  } else {
    await createTransactionForWallet(
      'Deposit',
      'Credit',
      data.amount,
      user.id,
      `Deposit of ₦${data.amount} By Card`,
      `Deposit of ₦${data.amount} By Card`
    )
  }
  console.log('before card')
  // save card
  await UserCard.query()
    .insert({
      user_id: user.id,
      auth: data.authorization.authorization_code,
      last_four_digit: data.authorization.last4,
      status: true,
      country_code: data.authorization.country_code,
      expiry_month: data.authorization.exp_month,
      expiry_year: data.authorization.exp_year,
      signature: data.authorization.signature,
      bank: data.authorization.bank,
      reusable: data.authorization.reusable,
      card_name: data.authorization.card_type
    })
    .catch(e => {
      console.log(e)
      throw UnprocessableEntity('Invalid Body')
    })

  // create order if true
  if (order) {
    let ctx = {
      request: {
        body: body
      },
      state: {
        user: {
          user: user
        }
      }
    }
    console.log(ctx)
    await createOrder(ctx)
  }
}

export const chargeCard = async data => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.paystack.co/transaction/charge_authorization',
      data,
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json'
      }
    })

    return {
      status: response.data.data.status,
      amount: response.data.data.amount,
      reference: response.data.data.reference,
      authorization: response.data.data.authorization
    }
  } catch (error) {
    throw UnprocessableEntity(error.response.data.message)
  }
}
