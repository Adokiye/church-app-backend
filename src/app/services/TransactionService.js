import Transaction from '../models/transaction'
import User from '../models/user'

const transaction_types = ['Deposit', 'Transfer', 'Withdraw']
const transaction_actions = ['Credit', 'Debit']

export const createTransaction = async (
    transaction_type,
    transaction_action,
    amount,
    user_id
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
           
          }),
  
          NextOfKin.query().insert({
            ...next_of_kin
          }),
        ])
  
        const personal_data = await PersonalDetail.query().insert({
          first_name: personal_details.first_name,
          last_name: personal_details.last_name,
          other_name: personal_details.other_name,
          dob: personal_details.dob,
          gender: personal_details.gender,
          title: personal_details.title,
          home_address: personal_details.home_address,
          state: personal_details.state,
          lga: personal_details.lga,
          phone_number: personal_details.phone_number,
          secondary_phone_number: personal_details.secondary_phone_number,
          account_type: constant_type.IPPIS,
          bvn: personal_details.bvn,
          ippis_number: personal_details.ippis_number,
          email: personal_details.email,
          password: await encryptPassword(personal_details.password),
          employment_id: employment_data.id,
          next_of_kin_id: next_of_kin_data.id,
          salary_id: account_data.id,
          documents_id: documents.id,
          otp_token: personal_details.otpToken,
          email_confirm_token: personal_details.confirmEmailToken
        })
  
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