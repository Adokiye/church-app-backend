import Cokitchen from '../models/cokitchen'
import OrderType from '../models/order_type'
import Order from '../models/order'
import Meal from '../models/meal'
import Addon from '../models/addons'
import DealType from '../models/deal_type'
import Deal from '../models/deal'
import CokitchenPolygon from '../models/cokitchen_polygon'
import CalculatedOrder from '../models/calculated_order'
import { checkIfAdmin } from '../services/RoleService'
import { Unauthorized, encryptPassword } from '../helpers'

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

  Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += this[i][prop]
    }
    return total
  }
  let service_charge = 0
  //1- get deal from the db based on the request
  if (body.deal) {
    let deal = body.deal
    let dealInDb = await Deal.query()
      .where({
        id: deal
      })
      .withGraphFetched('[brand, deal_type]')
      .catch(() => false)
    if (!dealInDb) {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          deal: [`deal not found id:${deal}`]
        }
      })
    }
  }

  //2- get the users cokitchen polygon
  let cokitchen_polygon = body.cokitchen_polygon
  let cokitchenPolygonInDb = await CokitchenPolygon.query()
    .where({
      id: cokitchen_polygon
    })
    .catch(() => false)
  if (!cokitchenPolygonInDb) {
    return res.status(404).json({
      status: 'error',
      message: 'Not Found',
      errors: {
        cokitchen_polygon: [
          `cokitchen_polygon not found id:${cokitchen_polygon}`
        ]
      }
    })
  }
  //step 3- get all meals and addons from the db based on the request
  var i = 0,
    len = body.meal_details.length
  let meals = []
  let total_meal_amount = 0
  while (i < len) {
    let mealInDb = await Meal.query()
      .where({
        id: body.meal_details[i].meal_id
      })
      .withGraphFetched('[brand]')
      .catch(() => false)
    if (mealInDb) {
      let addons = []
      if (body.meal_details[i].addons.length > 0) {
        let addons_len = body.meal_details[i].addons.length
        while (j < addons_len) {
          let addonInDb = await Addon.query()
            .where({
              id: body.meal_details[i].addons[j].addon_id
            })
            .catch(() => false)
          if (addonInDb) {
            addonInDb.qty = body.meal_details[i].addons[j].addon_qty
            addonInDb.total_amount =
              body.meal_details[i].addons[j].addon_qty * addonInDb.amount
            addons.push(addonInDb)
          } else {
            return res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                addon: [
                  `addon not found meal-index:${i}, addon-index:${j} addon-id:${body.meal_details[i].addons[j].addon_id}`
                ]
              }
            })
          }
          j++
        }
      }
      mealInDb.addons = addons
      mealInDb.qty = body.meal_details[i].meal_qty
      let brand_found = false
      // find the meals brand and push to that array
      for (let x = 0; x < meals.length; x++) {
        if (meals[x].brand.id == mealInDb.brand.id) {
          meals[x].meals.push(mealInDb)
          meals[x].amount += Number(mealInDb.amount) * Number(mealInDb.qty)
          brand_found = true
          break
        }
      }
      if (!brand_found) {
        meals.push({
          brand: mealInDb.brand,
          meals: [mealInDb],
          amount:
            Number(mealInDb.amount) * Number(mealInDb.qty) +
            mealInDb.addons.sum('total_amount')
        })
      }
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          meal: [
            `meal not found meal-index:${i} meal-id:${body.meal_details[i].meal_id}`
          ]
        }
      })
    }
    i++
  }

  // if without deals meals amount is less than 2000, apply service charge
  if (meals.sum('amount') < 2000) {
    service_charge = 0.05
  }
  // 4- if deal exists , apply deal to amount
  if (body.deaL) {
    if (dealInDb.deal_type.name == 'BRAND') {
      for (let i = 0; i < meals.length; i++) {
        //check if deals minimum amount is less than meals total amount
        if (
          meals[x].brand.id == dealInDb.brand.id &&
          dealInDb.min < meals[x].amount
        ) {
          //apply deal
          meals[x].amount -= meals[x].amount * dealInDb.rate
          break
        }
      }
      total_meal_amount += meals.sum('amount')
    } else {
      total_meal_amount += meals.sum('amount')
      if (dealInDb.min < total_meal_amount) {
        //apply deal
        total_meal_amount -= total_meal_amount * dealInDb.rate
      }
    }
  } else {
    total_meal_amount += meals.sum('amount')
  }
  //5- service fee is applicable to orders of price less than NGN2000
  total_meal_amount += total_meal_amount * service_charge

  //6 - add polygon delivery fee
  total_meal_amount += Number(cokitchenPolygonInDb.delivery_fee)

  const calculated_order = await CalculatedOrder.query().insert({
    total_amount: total_meal_amount,
    service_charge,
    delivery_fee: cokitchenPolygonInDb.delivery_fee
  })

  return {
    status: 'success',
    message: 'order calulated successfully',
    calculated_order
  }
}

export const createOrder = async ctx => {
  const { body } = ctx.request
  let [orderTypeInDb, calculatedOrderInDb] = await Promise.all([
    OrderType.query()
      .where({
        id: body.order_type_id
      })
      .catch(() => false),
    CalculatedOrder.query()
      .where({
        id: body.calculated_order_id
      })
      .catch(() => false),
    Repository.Account.getAccountByAccountNumber(userTag)
  ])
  if (!orderTypeInDb) {
    return res.status(404).json({
      status: 'error',
      message: 'Not Found',
      errors: {
        order_type: ['order type not found']
      }
    })
  }
  if (!calculatedOrderInDb) {
    return res.status(404).json({
      status: 'error',
      message: 'Not Found',
      errors: {
        calculated_order: ['calculated order not found']
      }
    })
  }

  switch (orderTypeInDb.name) {
    case 'WALLET':
      break
    case 'CARD':
      // code block
      break
    case 'CASH':
      // code block
      break
    default:
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          order_type: ['order type not found']
        }
      })
  }
}
