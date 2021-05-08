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
  setPendingOrder,
  createPosistOrder,
  makeCode
} from '../helpers'
import crypto from 'crypto'

export const getOrders = async ctx => {
  const { id } = ctx.state.user.user

  const orders = await Order.query()
    .where('user_id', id)
    .withGraphFetched('[calculated_order,order_type]')
    .catch(() => [])

  return {
    status: 'success',
    message: 'Successful',
    data: orders
  }
}

export const getOrderTypes = async ctx => {
  const { id } = ctx.state.user.user

  const order_types = await OrderType.query().catch(() => [])

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
  let address_details = body.address_details
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
      .catch(e => {
        console.log(e)
        return false
      })
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
  var i = 0,
    j = 0,
    len = meals.length
  let selected_meals = []
  let total_meal_amount = 0
  while (i < len) {
    let mealInDb = await Meal.query()
      .findById(meals[i].id)
      .withGraphFetched('[brand]')
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
            .where('meal_addon_id', meals[i].addons[j].id)
            .where('meal_id', meals[i].id)
            .limit(1)
            .first()
            .withGraphFetched('[meal_data]')
            .catch(e => {
              console.log(e)
              false
            })
          if (addonInDb) {
            addonInDb.quantity = meals[i].addons[j].quantity
            addonInDb.amount =
              addonInDb.quantity * Number(addonInDb.meal_data.amount)
            console.log(addonInDb)
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
            mealInDb.addons.sum('amount')
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
            mealInDb.addons.sum('amount')
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
    address_details,
    meals: JSON.stringify(selected_meals),
    cokitchen_polygon_id,
    lat,
    lng,
    user_id: userInDb.id,
    posist_meals: JSON.stringify(body.meals)
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
      console.log(address_details)
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
  const { id } = ctx.state.user.user

  let order_details = false
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
      .withGraphFetched('[user]')
      .catch(e => {
        console.log(e)
        throw NotFound('Calculated order not found')
      })
  ])
  let order,
    posist_order,
    posist_meals_formatted = [],
    meals,
    order_data
  console.log(calculatedOrderInDb.meals)
  meals = calculatedOrderInDb.meals
  console.log(meals)
  for (let k = 0; k < meals.length; k++) {
    console.log(meals[k])
    for (let i = 0; i < meals[k].meals.length; i++) {
      console.log(meals[k].meals[i])
      for (let j = 0; j < meals[k].meals[i].addons.length; j++) {
        meals[k].meals[i].posist_addons = []
        meals[k].meals[i].posist_addons.push({
          _id: meals[k].meals[i].addons[j].meal_data.posist_data._id,
          quantity: meals[k].meals[i].addons[j].quantity
        })
      }
      posist_meals_formatted.push({
        id: meals[k].meals[i].posist_data._id,
        quantity: meals[k].meals[i].quantity,
        // "discounts": [
        //   {
        //     "value": 10,
        //     "type": "percentage"
        //   }
        // ],
        addOns: meals[k].meals[i].posist_addons
      })
    }
  }
  console.log(posist_meals_formatted)
  switch (orderTypeInDb.name) {
    case 'WALLET':
      break
    case 'CARD':
      // code block
      break
    case 'CASH':
      order_data = {
        order_type_id: orderTypeInDb.id,
        calculated_order_id: calculatedOrderInDb.id
      }
      if (order_details) {
        order_data.order_details = order_details
      }
      order = await Order.query()
        .insert({
          order_details,
          order_type_id: orderTypeInDb.id,
          calculated_order_id: calculatedOrderInDb.id,
          user_id: id,
          completed: false,
          cancelled: false,
          paid: false,
          order_code: crypto
            .randomBytes(20)
            .toString('hex')
            .substring(0, 6)
            .toLowerCase()
        })
        .withGraphFetched('[calculated_order.[user],order_type]')
        .catch(e => {
          console.log(e)
          throw UnprocessableEntity('Invalid order body')
        })
      // posist_order = await createPosistOrder(
      //   {
      //     source: {
      //       order_id: order.id
      //     },
      //     payments: {
      //       type: 'COD'
      //     },
      //     discount: {
      //       type: 'fixed',
      //       value: 10
      //     },
      //     charges: [
      //       {
      //         name: 'Delivery Charge',
      //         value: calculatedOrderInDb.delivery_fee
      //       },
      //       {
      //         name: 'Service Charge',
      //         value: calculatedOrderInDb.service_charge
      //       }
      //     ],
      //     customer: {
      //       firstname: calculatedOrderInDb.user.first_name != null?calculatedOrderInDb.user.first_name:calculatedOrderInDb.user.phone_number,
      //       mobile: calculatedOrderInDb.user.phone_number,
      //       addType: 'home',
      //       address1: calculatedOrderInDb.address,
      //       address2: calculatedOrderInDb.address,
      //       city: calculatedOrderInDb.address
      //     },
      //     delivery_area:calculatedOrderInDb.address,
      //   "triggers":{
      //     "acceptUrl":"https://accepturl.com/orderId",
      //     "rejectUrl",
      //     "preparedUrl",
      //     "dispatchedUrl"
      // }
      //     tabType: 'delivery',
      //     items: posist_meals_formatted
      //   },
      //   calculatedOrderInDb.meals[0].brand.posist_customer_key
      // )
      break
    default:
      throw NotFound('Not found')
  }

  return {
    status: 'success',
    message: 'order created successfully',
    order
  }
}

export const kitchenAcceptOrder = async ctx => {
  const { order_code } = ctx.params
  let order = await Order.query()
    .where({
      order_code
    })
    .catch(e => {
      console.log(e)
      throw NotFound('Order not found')
    })
  order = await Order.query()
    .patchAndFetchById(order.id, {
      kitchen_accepted: true
    })
    .withGraphFetched('[calculated_order.[user],order_type]')

  // send order to rider
  await setPendingOrder(order)

  return {
    status: 'success',
    message: 'order created successfully',
    order
  }
}

export const kitchenDispatchOrder = async ctx => {
  const { order_code } = ctx.params
  let order = await Order.query()
    .where({
      order_code
    })
    .catch(e => {
      console.log(e)
      throw NotFound('Order not found')
    })
  order = await Order.query()
    .patchAndFetchById(order.id, {
      kitchen_dispatched: true
    })
    .withGraphFetched('[calculated_order.[user],order_type]')


  return {
    status: 'success'
  }
}

export const kitchenPreparedOrder = async ctx => {
  const { order_code } = ctx.params
  let order = await Order.query()
    .where({
      order_code
    })
    .catch(e => {
      console.log(e)
      throw NotFound('Order not found')
    })
  order = await Order.query()
    .patchAndFetchById(order.id, {
      kitchen_prepared: true
    })
    .withGraphFetched('[calculated_order.[user],order_type]')

  return {
    status: 'success',
  }
}
