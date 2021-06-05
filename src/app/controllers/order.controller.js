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
import { createTransaction } from '../services/TransactionService'
import {
  Unauthorized,
  encryptPassword,
  UnprocessableEntity,
  setPendingOrder,
  setTrackingOrder,
  deletePendingOrder,
  createPosistOrder,
  makeCode,
  NotFound,
  insidePolygon,
  getLatLonDiffInMeters
} from '../helpers'
import crypto from 'crypto'
import { API_URL } from '../config.js'

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
  // check if lat and lng is in polygon
  if (!insidePolygon([lat, lng], cokitchenPolygonInDb.polygon)) {
    throw UnprocessableEntity(`user location isn't in the polygon`)
  }
  //step 3- get all meals and addons from the db based on the request
  var i = 0,
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
        console.log(meals[i])
        var j = 0
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
            addons.push(addonInDb)
          } else {
            throw UnprocessableEntity(
              `addon not found meal-index:${i}, addon-index:${j} addon-id:${meals[i].addons[j].id}`
            )
          }
          j++
        }
      } else {
        console.log('check data')
        console.log(meals[i])
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
      .withGraphFetched('[user,cokitchen_polygon]')
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
          paid: true,
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

      break
    default:
      throw NotFound('Not found')
  }
  await sendPosistOrder({
    calculatedOrderInDb,
    order,
    posist_meals_formatted
  })

  console.log(order)
  await setTrackingOrder(order)
  return {
    status: 'success',
    message: 'order created successfully',
    order
  }
}

export const sendPosistOrder = async data => {
  const { order, calculatedOrderInDb, discount, posist_meals_formatted } = data
  console.log(data)
  let data_to_send = {
    source: {
      order_id: order.id
    },
    payments: {
      type: order.order_type.name
    },
    // discount: {
    //   type: 'fixed',
    //   value: 10
    // },
    charges: [
      {
        name: 'Delivery Charge',
        value: calculatedOrderInDb.delivery_fee
      },
      {
        name: 'Service Charge',
        value: calculatedOrderInDb.service_charge
      }
    ],
    customer: {
      firstname:
        calculatedOrderInDb.user.first_name != null
          ? calculatedOrderInDb.user.first_name
          : calculatedOrderInDb.user.phone_number,
      mobile: calculatedOrderInDb.user.phone_number,
      addType: calculatedOrderInDb.address_details.name,
      address1: `${calculatedOrderInDb.address_details.building_number}, ${calculatedOrderInDb.address_details.adress_line}`,
      address2: `${calculatedOrderInDb.address_details.building_number}, ${calculatedOrderInDb.address_details.adress_line}`,
      city: calculatedOrderInDb.address_details.city
    },
    delivery_area: calculatedOrderInDb.cokitchen_polygon.name,
    triggers: {
      acceptUrl: `${API_URL}/posist/order/accept/${order.order_code}`,
      rejectUrl: `${API_URL}/posist/order/reject/${order.order_code}`,
      preparedUrl: `${API_URL}/posist/order/prepared/${order.order_code}`,
      dispatchedUrl: `${API_URL}/posist/order/dispatched/${order.order_code}`
    },
    tabType: 'delivery',
    items: posist_meals_formatted
  }
  if (discount) {
    data_to_send.discount = discount
  }
  console.log('data_to_Send to posist:')
  console.log(data_to_send)
  //for (let i = 0; i < calculatedOrderInDb.meals.length; i++) {
  let posist_order = await createPosistOrder(
    data_to_send,
    calculatedOrderInDb.meals[0].brand.posist_customer_key
  )
  // }
  return true
}

export const kitchenAcceptOrder = async ctx => {
  const { order_code } = ctx.params
  let order = await Order.query()
    .findOne({
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
  const [pending_order, tracking_order] = await Promise.all([
    setPendingOrder(order),
    setTrackingOrder({
      kitchen_accepted: true,
      id: order.id
    })
  ])

  return {
    status: 'success',
    message: 'order created successfully',
    order
  }
}

export const kitchenDispatchOrder = async ctx => {
  const { order_code } = ctx.params
  let order = await Order.query()
    .findOne({
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
    .withGraphFetched('[calculated_order.[user],order_type, rider]')
  const [tracking_order] = await Promise.all([
    setTrackingOrder({
      kitchen_dispatched: true,
      id: order.id
    })
  ])
  return {
    status: 'success'
  }
}

export const kitchenPreparedOrder = async ctx => {
  const { order_code } = ctx.params
  let order = await Order.query()
    .findOne({
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
  const [tracking_order] = await Promise.all([
    setTrackingOrder({
      kitchen_prepared: true,
      id: order.id
    })
  ])
  return {
    status: 'success'
  }
}

export const kitchenRejectedOrder = async ctx => {
  const { order_code } = ctx.params
  let order = await Order.query()
    .findOne({
      order_code
    })
    .withGraphFetched('[calculated_order.[user],order_type]')

    .catch(e => {
      console.log(e)
      throw NotFound('Order not found')
    })
  if (['WALLET', 'CARD'].includes(order.order_type.name)) {
    let [orderToUpdate, transaction_data] = await Promise.all([
      Order.query().patchAndFetchById(order.id, {
        kitchen_cancelled: true,
        cancelled: true
      }),
      createTransaction(
        'Deposit',
        'Credit',
        order.calculated_order.total_amount,
        order.user_id,
        '',
        'Order cancelled by Kitchen'
      )
    ])
  } else {
    let orderToUpdate = await Order.query().patchAndFetchById(order.id, {
      kitchen_cancelled: true,
      cancelled: true
    })
  }

  const [tracking_order] = await Promise.all([
    setTrackingOrder({
      kitchen_cancelled: true,
      cancelled: true,
      id: order.id
    }),
    deletePendingOrder(order)
  ])
  return {
    status: 'success'
  }
}

export const riderAcceptOrder = async ctx => {
  const { body } = ctx.request
  const { id } = ctx.state.user.user

  let order = await Order.query()
    .findById(body.order_id)
    .withGraphFetched('[calculated_order]')

    .catch(e => {
      console.log(e)
      throw NotFound('Order not found')
    })
  //get first rider active order
  let rider_active_order = await Order.query()
    .where('rider_id', id)
    .where('completed', false)
    .where('cancelled', false)
    .where('rider_assigned', true)
    .withGraphFetched('[calculated_order]')

    .limit(1)
    .first()
    .catch(e => {
      console.log(e)
      return false
    })
  if (rider_active_order) {
    console.log(rider_active_order)
    const distance = await getLatLonDiffInMeters(
      rider_active_order.calculated_order.lat,
      rider_active_order.calculated_order.lng,
      order.calculated_order.lat,
      order.calculated_order.lng
    )
    if (distance > 3000) {
      throw UnprocessableEntity('Active Order already exists')
    }
  }
  order = await Order.query()
    .patchAndFetchById(order.id, {
      rider_assigned: true,
      rider_id: id
    })
    .withGraphFetched('[calculated_order.[user],order_type, rider]')

  const [tracking_order, pending_order] = await Promise.all([
    setTrackingOrder({
      rider: order.rider,
      rider_assigned: true,
      id: order.id
    }),
    deletePendingOrder(order)
  ])
  return {
    status: 'success'
  }
}

export const getRiderActiveOrders = async ctx => {
  const { body } = ctx.request
  const { id } = ctx.state.user.user

  let rider_active_orders = await Order.query()
    .where('rider_id', id)
    .where('completed', false)
    .where('cancelled', false)
    .where('rider_assigned', true)
    .withGraphFetched('[calculated_order.[user],order_type, rider]')
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'Successful',
    data: rider_active_orders
  }
}
