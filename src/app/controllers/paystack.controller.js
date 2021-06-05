import PaystackService from '../services/PaystackService'

export const handleCharge = async ctx => {
  const { body } = ctx.request
  const { event, data } = body

  switch (event) {
    case PaystackEvents.CHARGE_SUCCESS:
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
