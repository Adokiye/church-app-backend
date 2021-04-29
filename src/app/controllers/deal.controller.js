import Brand from '../models/brand'
import Deal from '../models/deal'
import Posts from '../models/posts'
import DealType from '../models/deal_type'
import DealEligibilityType from '../models/deal_eligibility_type'
import DealRequirementType from '../models/deal_requirement_type'
import DealValueType from '../models/deal_value_type'
import Cokitchen from '../models/cokitchen'
import { checkIfAdmin, checkIfMarketing } from '../services/RoleService'
import { NotFound, Unauthorized, UnprocessableEntity } from '../helpers'

export const createDeal = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  let post = false
  if (body.images) {
    body.images = JSON.stringify(body.images)
  }
  if(body.post){
    post = body.post
    delete body.post
  }
  if (await checkIfMarketing(role)) {
    const [
      deal_type_data,
      deal_eligibility_type_data,
      deal_value_type_data,
      deal_requirement_type_data
    ] = await Promise.all([
      DealType.query()
        .findById(body.deal_type_id)
        .catch(e => false),
      DealEligibilityType.query()
        .findById(body.deal_eligibility_type_id)
        .catch(e => false),
      DealValueType.query()
        .findById(body.deal_value_type_id)
        .catch(e => false),
      DealRequirementType.query()
        .findById(body.deal_requirement_type_id)
        .catch(e => false)
    ])
    if (!deal_type_data) {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          deal_type: ['Deal type not found with that id']
        }
      })
    }
    if (!deal_eligibility_type_data) {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          deal_eligibility_type: [
            'Deal Eligibility type not found with that id'
          ]
        }
      })
    }
    if (!deal_value_type_data) {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          deal_value_type: ['Deal Value type not found with that id']
        }
      })
    }
    if (!deal_requirement_type_data) {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          deal_requirement_type: ['Deal Value type not found with that id']
        }
      })
    }
    if (deal_eligibility_type_data.name === 'SPECIFIC_CUSTOMERS') {
      if (!body.specific_customers) {
        throw UnprocessableEntity(
          'For eligibility type SPECIFIC_CUSTOMERS, specific_customers array is required'
        )
      }
      body.specific_customers = JSON.stringify(body.specific_customers)
    }
    switch (deal_requirement_type_data.name) {
      case 'MINIMUM_PURCHASE_AMOUNT':
        if (!body.min_amount) {
          throw UnprocessableEntity(
            'For requirement type MINIMUM_PURCHASE_AMOUNT, min_amount is required'
          )
        }
        break
      case 'MINIMUM_QUANTITY_OF_ITEMS':
        if (!body.min_items) {
          throw UnprocessableEntity(
            'For requirement type MINIMUM_QUANTITY_OF_ITEMS, min_items is required'
          )
        }
        break
    }
    switch (deal_value_type_data.name) {
      case 'PERCENTAGE':
        if (!body.rate) {
          throw UnprocessableEntity(
            'For value type PERCENTAGE, rate is required'
          )
        }
        break
      case 'FIXED_AMOUNT':
        if (!body.fixed_amount) {
          throw UnprocessableEntity(
            'For value type FIXED_AMOUNT, fixed_amount is required'
          )
        }
        break
    }
    if (deal_type_data.name === 'BRAND') {
      if (!body.brands) {
        throw UnprocessableEntity(
          'for deal type BRAND, brands array is required'
        )
      }
      const brands = body.brands
      delete body.brands
      var deals = []
      var i = 0,
        len = brands.length
      while (i < len) {
        const brand_data = await Brand.query()
          .where('id', brands[i].id)
          .catch(() => false)
        if (brand_data) {
          body.brand_id = brand_data[0].id
          body.cokitchen_id = brand_data[0].cokitchen_id
          const deal_data = await Deal.query()
            .insert(body)
            .catch(e => {
              console.log(e)
              throw UnprocessableEntity('Invalid Body')
            })
          deals.push(deal_data)
        } else {
          return res.status(404).json({
            status: 'error',
            message: 'Not Found',
            errors: {
              brand: ['Brand not found for id ' + brands[i].id]
            }
          })
        }
        i++
      }
      return {
        status: 'success',
        message: 'Deal Creation Successful',
        data: deals
      }
    } else {
      if (!body.cokitchen_id) {
        throw UnprocessableEntity('for deal type ALL, cokitchen_id is required')
      }
      const deal_data = await Deal.query()
        .insert(body)
        .catch(e => {
          console.log(e)
          throw UnprocessableEntity('Invalid Body')
        })
      return {
        status: 'success',
        message: 'Deal Creation Successful',
        data: deal_data
      }
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const updateDeal = async ctx => {
  const { id } = ctx.params
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    if (body.images) {
      body.images = JSON.stringify(body.images)
    }
    const deal_data = await Deal.query()
      .patchAndFetchById(id, body)
      .withGraphFetched('[deal_type]')
    return {
      status: 'success',
      message: 'Update Successful',
      ...deal_data
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const getDealTypes = async ctx => {
  const [
    deal_types,
    deal_eligibility_types,
    deal_value_types,
    deal_requirement_types
  ] = await Promise.all([
    DealType.query().catch(e => []),
    DealEligibilityType.query().catch(e => []),
    DealValueType.query().catch(e => []),
    DealRequirementType.query().catch(e => [])
  ])
  return {
    status: 'success',
    message: 'Successful',
    deal_types,
    deal_eligibility_types,
    deal_value_types,
    deal_requirement_types
  }
}

export const getCokitchenDeals = async ctx => {
  const cokitchen_with_deals = await Cokitchen.query()
    .withGraphFetched(
      '[deals.[deal_type, deal_value_type, deal_eligibility_type, deal_requirement_type]]'
    )
    .catch(e => {
      console.log(e)
      return []
    })
  return {
    status: 'success',
    message: 'Successful',
    data: cokitchen_with_deals
  }
}
