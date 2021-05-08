import Transaction from '../models/transaction'
import { transaction } from 'objection'
import User from '../models/user'
import { UnprocessableEntity } from '../helpers'

const transaction_types = ['Deposit', 'Transfer', 'Withdraw']
const transaction_actions = ['Credit', 'Debit']

export const createTransaction = async (
  transaction_type,
  transaction_action,
  amount,
  user_id,
  description,
  reason
) => {
  return await transaction(Transaction, User, async (Transaction, User) => {
    const user = await User.query()
      .findById(user_id)
      .catch(e => {
        console.log(e)
        throw UnprocessableEntity('Invalid Body')
      })
    let balance = Number(user.balance)
    switch (transaction_action) {
      case 'Debit':
        balance -= Number(amount)
        break
      case 'Credit':
        balance += Number(amount)
        break
      default:
        throw UnprocessableEntity('Invalid Transaction Action')
    }
    const [transaction_data, user_data] = await Promise.all([
      Transaction.query().insert({
        amount,
        user_id: user.id,
        transaction_type,
        transaction_action,
        transaction_status: 'Success',
        description,
        reason
      }),

      User.query().patchAndFetchById(user.id, {
        balance: balance.toString()
      })
    ])

    return {
      transaction_data,
      user_data
    }
  })
}
