// import Repository from 'App/Models/Repository';
// import Constants from 'App/Constants';
// import RabbitMqTransactionService from 'App/RabbitMq/TransactionService';
// import Helpers from 'App/Helpers';

// /**
//  * Handle Charge Success
//  */
// export default class HandleChargeSuccess {
//   /**
//    * handle
//    * @param data - data
//    */
//   public static async handle(data) {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { email } = data.customer;

//     // get user details
//     const user = await Repository.User.getUser({ email });

//     // get admin details
//     const admin = await Repository.User.getUser({ is_admin: true });

//     // get current account for user
//     const currentAccount = user.accounts.find(
//       (item) => item.account_type.name === Constants.AccountType.CURRENT
//     );

//     // create pending transaction
//     const transaction = await Repository.Transaction.createTransaction({
//       senderAccountId: admin.accounts[0].id,
//       receiverAccountId: currentAccount?.id || user.accounts[0].id,
//       transactionType: 'Deposit',
//       status: 'Pending',
//       amount: data.amount,
//       description: `Fund|${data.amount}|Paystack|${data.reference}`,
//       reference: data.reference,
//     });

//     // save card
//     await Repository.Card.createCard({
//       userId: user.id,
//       accountId: currentAccount?.id || user.accounts[0].id,
//       auth: data.authorization.authorization_code,
//       lastFourDigit: data.authorization.last4,
//       status: true,
//       countryCode: data.authorization.country_code,
//       expiryMonth: data.authorization.exp_month,
//       expiryYear: data.authorization.exp_year,
//       signature: data.authorization.signature,
//       bank: data.authorization.bank,
//       reusable: data.authorization.reusable,
//       cardName: data.authorization.account_name,
//     });

//     // send transaction to transaction service
//     RabbitMqTransactionService.queueTransaction({ transaction, action: 'fund_account' });

//     // validate tier
//     const meetsTierRequirements = await Helpers.TierValidation.validate({
//       tierId: currentAccount?.tier_id,
//       amount: data.amount,
//       action: 'fund_with_card',
//     });

//     // lock account if account does not meet user requirement
//     if (!meetsTierRequirements) {
//       await Repository.Account.lockAccount(currentAccount?.id);
//     }
//   }
// }

// /* istanbul ignore file */

// import axios from 'axios';
// import Env from '@ioc:Adonis/Core/Env';

// const paystackToken = Env.get('PAYSTACK_SECRET_KEY');

// /**
//  * Charge Authorization
//  */
// export default class ChargeAuthorization {
//   /**
//    * charge
//    */
//   public static async charge(data) {
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
