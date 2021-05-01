import Cokitchen from '../models/cokitchen'
import OrderType from '../models/order_type'
import Order from '../models/order'
import Meal from '../models/meal'
import User from '../models/user'
import Addon from '../models/addons'
import DealType from '../models/deal_type'
import Deal from '../models/deal'
import CokitchenPolygon from '../models/cokitchen_polygon'
import CalculatedOrder from '../models/calculated_order'
import { checkIfAdmin } from '../services/RoleService'
import {
  Unauthorized,
  encryptPassword,
  UnprocessableEntity,
  setPendingOrder
} from '../helpers'

export const getOrderTypes = async ctx => {
  const order_types = OrderType.query()
  return {
    status: 'success',
    message: 'Successful',
    data: order_types
  }
}

export const calculateOrder = async ctx => {
  const { body } = ctx.request
  const { id } = ctx.state.user.user

  // initialize the body variables
  let discount_code = body.discount_code
  let cokitchen_polygon_id = body.cokitchen_polygon_id
  let meals = body.meals
  let address = body.address
  let lat = body.lat
  let lng = body.lng
  let dealInDb = { id: '' }
  let free_delivery = false

  Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += this[i][prop]
    }
    return total
  }
  // make service charge 0 at first in case the order is greater than 1999
  let service_charge = 0
  // calculate the order based on each body value
  //1- get deal from the db based on the request if discount code exists
  if (discount_code) {
    dealInDb = await Deal.query()
      .where({
        discount_code: discount_code
      })
      .withGraphFetched(
        '[brand, deal_type, deal_requirement_type, deal_eligibility_type, deal_value_type]'
      )
      .catch(() => false)
    if (!dealInDb) {
      throw UnprocessableEntity(
        `deal not found for discount code:${discount_code}`
      )
    } else {
      dealInDb = dealInDb[0]
    }
  }

  //2- get the users cokitchen polygon
  let [cokitchenPolygonInDb, userInDb] = await Promise.all([
    CokitchenPolygon.query()
      .findById(cokitchen_polygon_id)
      .catch(() => false),
    User.query()
      .findById(id)
      .catch((e) => {console.log(e);return false})
  ])
  if (!cokitchenPolygonInDb) {
    throw UnprocessableEntity(
      `cokitchen_polygon not found for id:${cokitchen_polygon_id}`
    )
  }
  if (!userInDb) {
    throw UnprocessableEntity(`user not found for id:${id}`)
  }
  //step 3- get all meals and addons from the db based on the request
  var i = 0,j=0,
    len = meals.length
  let selected_meals = []
  let total_meal_amount = 0
  while (i < len) {
    let mealInDb = await Meal.query()
      .findById(meals[i].id)
      .catch(e => {
        console.log(e)
        false
      })
    if (mealInDb) {
      let addons = []
      if (meals[i].addons.length > 0) {
        let addons_len = meals[i].addons.length
        while (j < addons_len) {
          let addonInDb = await Addon.query()
            .where('id',meals[i].addons[j].id)
            .where('meal_id',meals[i].id)
            .limit(1).first()
            .catch(e => {
              console.log(e)
              false
            })
          if (addonInDb) {
            addonInDb.quantity = meals[i].addons[j].quantity
            addonInDb.total_amount =
              meals[i].addons[j].quantity * addonInDb.amount
            addons.push(addonInDb)
          } else {
            throw UnprocessableEntity(
              `addon not found meal-index:${i}, addon-index:${j} addon-id:${meals[i].addons[j].id}`
            )
          }
          j++
        }
      }
      mealInDb.addons = addons
      mealInDb.quantity = meals[i].quantity
      let brand_found = false
      // find the meals brand and push to that array
      for (let x = 0; x < selected_meals.length; x++) {
        if (selected_meals[x].brand.id == mealInDb.brand.id) {
          selected_meals[x].meals.push(mealInDb)
          selected_meals[x].amount +=
            Number(mealInDb.amount) * mealInDb.quantity +
            mealInDb.addons.sum('total_amount')
          brand_found = true
          break
        }
      }
      if (!brand_found) {
        selected_meals.push({
          brand: mealInDb.brand,
          meals: [mealInDb],
          amount:
            Number(mealInDb.amount) * mealInDb.quantity +
            mealInDb.addons.sum('total_amount')
        })
      }
    } else {
      throw UnprocessableEntity(
        `meal not found meal-index:${i} meal-id:${meals[i].id}`
      )
    }
    i++
  }

  // if without deals meals amount is less than 2000, apply service charge
  if (selected_meals.sum('amount') < 2000) {
    console.log(selected_meals.sum('amount'))
    service_charge = 60
  }
  // 4- if deal exists , apply deal to amount
  if (discount_code) {
    if (dealInDb.deal_type.name == 'BRAND') {
      for (let i = 0; i < selected_meals.length; i++) {
        //check if deals minimum amount is less than meals total amount
        if (
          selected_meals[x].brand.id == dealInDb.brand.id &&
          dealInDb.min < selected_meals[x].amount
        ) {
          //apply deal
          selected_meals[x].amount -= selected_meals[x].amount * dealInDb.rate
          break
        }
      }
      total_meal_amount += selected_meals.sum('amount')
    } else {
      total_meal_amount += selected_meals.sum('amount')
      if (dealInDb.min < total_meal_amount) {
        //apply deal
        total_meal_amount -= total_meal_amount * dealInDb.rate
      }
    }
  } else {
    total_meal_amount += selected_meals.sum('amount')
    console.log(total_meal_amount)
  }
  //5- service fee is applicable to orders of price less than NGN2000
  total_meal_amount += service_charge

  //6 - add polygon delivery fee
  console.log(total_meal_amount)
  total_meal_amount += Number(cokitchenPolygonInDb.delivery_fee)
  let calculatedData = {
    total_amount: total_meal_amount,
    service_charge,
    delivery_fee: cokitchenPolygonInDb.delivery_fee,
    address,
    meals: JSON.stringify(selected_meals),
    cokitchen_polygon_id,
    lat,
    lng,
    user_id: userInDb.id
  }
  if (dealInDb.id.length > 0) {
    calculatedData.deal_id = dealInDb.id
  }
  const calculated_order = await CalculatedOrder.query()
    .insert(calculatedData)
    .catch(e => {
      console.log(e)
      console.log(total_meal_amount)
      console.log(service_charge)
      console.log(cokitchenPolygonInDb.delivery_fee)
      console.log(address)
      console.log(selected_meals)
      console.log(cokitchen_polygon_id)
      console.log(lat + lng)
      throw UnprocessableEntity('Invalid Body')
    })
    calculated_order.meals = JSON.parse(calculated_order.meals)
  return {
    status: 'success',
    message: 'order calulated successfully',
    calculated_order,
    free_delivery,
    userInDb
  }
}

export const createOrder = async ctx => {
  const { body } = ctx.request
  order_details = JSON.stringify([])
  if (body.order_details) {
    order_details = JSON.stringify(body.order_details)
  }
  let use_wallet = false
  if (body.use_wallet) {
    use_wallet = true
  }
  let [orderTypeInDb, calculatedOrderInDb] = await Promise.all([
    OrderType.query()
      .findById(body.order_type_id)
      .catch(e => {
        console.log(e)
        throw NotFound('Order type not found')
      }),
    CalculatedOrder.query()
      .findById(body.calculated_order_id)
      .catch(e => {
        console.log(e)
        throw NotFound('Calculated order not found')
      })
  ])
  let order
  switch (orderTypeInDb.name) {
    case 'WALLET':
      break
    case 'CARD':
      // code block
      break
    case 'CASH':
      order = await Order.query()
        .insert({
          order_details,
          order_type_id: orderTypeInDb.id,
          calculated_order_id: calculatedOrderInDb.id
        })
        .catch(e => {
          console.log(e)
          throw UnprocessableEntity('Invalid order body')
        })
      break
    default:
      throw NotFound('Not found')
  }
  await setPendingOrder(order)

  return {
    status: 'success',
    message: 'order created successfully',
    order
  }
}
