import Transaction from '../models/transaction'
import User from '../models/user'

const transaction_types = ['Deposit', 'Transfer', 'Withdraw']
const transaction_actions = ['Credit', 'Debit']

export const createTransaction = async (
    transaction_type,
    transaction_action,
    amount,
    user,
    description,
    reason
  ) => {
    return await transaction(
      Transaction,
      User,
      async (
        Transaction,
        User,
      ) => {
        const [
          transaction_data,
          user_data
        ] = await Promise.all([
            Transaction.query().insert({
                amount,
                user_id:user.id,
                transaction_type,
                transaction_action,
                transaction_status:'Success',
                description,
                reason
          }),
  
          User.query().insert({
            ...next_of_kin
          }),
        ])
  
        return {
          personal_data,
          employment_data,
          next_of_kin_data,
          account_data,
          documents
        }
      }
    )
  }