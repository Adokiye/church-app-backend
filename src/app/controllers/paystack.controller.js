import { handle } from '../services/PaystackService'

export const handleCharge = async ctx => {
  const { body } = ctx.request
  console.log(body)

  return await handle(body)
}
