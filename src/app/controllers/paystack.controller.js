import Brand from '../models/brand'
import Cokitchen from '../models/cokitchen'
import CokitchenPolygon from '../models/cokitchen_polygon'
import MealCategory from '../models/meal_category'
import { checkIfAdmin, checkIfMarketing } from '../services/RoleService'
import { Unauthorized, insidePolygon, UnprocessableEntity } from '../helpers'

export const handleCharge = async ctx => {
  const { body } = ctx.request
  const { event, data } = body

  switch (event) {
    case PaystackEvents.CHARGE_SUCCESS:
      await Services.PaystackService.HandleChargeSuccess.handle(data)
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
