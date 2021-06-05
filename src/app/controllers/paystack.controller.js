import PaystackService from '../services/PaystackService'


export const handleCharge = async ctx => {
  const { body } = ctx.request
  console.log(body)
  const { event, data } = body
  
  switch (event) {
    case 'charge.success':
      await PaystackService.HandleChargeSuccess.handle(data)
      break

    /* istanbul ignore next */
    default:
      break
  }
  return {
    status: 'success',
    message: 'Paystack successful!'
  }
}
