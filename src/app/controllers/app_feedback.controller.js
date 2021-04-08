import AppFeedback from '../models/app_feedback'
import User from '../models/user'
import { checkIfMarketing } from '../services/RoleService'
import { Unauthorized, NotFound } from '../helpers'

export const createAppFeedback = async ctx => {
  const { body } = ctx.request
  const { user } = ctx.state.user

  const user_data = await User.query()
    .findOne({
      id: user.id
    })
    .catch(e => {
      console.log(e)
      return false
    })

  if (!user_data) {
    throw Unauthorized('User not Found. Please sign up')
  } else {
    body.user_id = user.id
    const app_feedback_data = await AppFeedback.query().insert(body)
    return {
      status: 'success',
      message: 'App feedback posted Successfully',
      ...app_feedback_data
    }
  }
}

export const getAppFeedbacks = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const app_feedback_data = await await AppFeedback.query().catch(e => {
      console.log(e)
      return []
    })
    return {
      status: 'success',
      message: 'App feedback data returned Successfully',
      data:app_feedback_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}
