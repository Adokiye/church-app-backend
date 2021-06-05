import UserCard from '../models/user_card'
import User from '../models/user'
import { checkIfMarketing } from '../services/PaystackService'
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
