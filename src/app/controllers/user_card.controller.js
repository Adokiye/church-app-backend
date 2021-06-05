import UserCard from '../models/user_card'
import User from '../models/user'
import { chargeCard } from '../services/PaystackService'
import { Unauthorized, NotFound, UnprocessableEntity } from '../helpers'

export const getUserCards = async ctx => {
  const { user } = ctx.state.user

  const user_card_data = await UserCard.query()
    .where({
      user_id: user.id
    })
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'User Cards returned Successfully',
    data: user_card_data
  }
}

export const chargeCardForWallet = async ctx => {
  const { body } = ctx.request
  const { id } = ctx.state.user.user
  const { card_id, amount } = body

  const [card, user] = Promise.all([
    UserCard.query()
      .findById(card_id)
      .catch(e => {
        console.log(e)
        throw NotFound('Card Not Found')
      }),
    User.query()
      .findById(card_id)
      .catch(e => {
        console.log(e)
        throw NotFound('User Not Found')
      })
  ])

  const chargeData = {
    authorization_code: card.auth,
    email: user.email,
    amount
  }

  const data = await chargeCard(chargeData)

  let card_to_update = await UserCard.query().patchAndFetchById(card_id, {
    auth: data.authorization.authorization_code,
    signature: data.authorization.signature,
    reusable: data.authorization.reusable,
  })
}
