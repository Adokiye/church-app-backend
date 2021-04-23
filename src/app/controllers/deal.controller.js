import Brand from '../models/brand'
import Deal from '../models/deal'
import DealType from '../models/deal_type'
import { checkIfAdmin, checkIfMarketing } from '../services/RoleService'
import { Unauthorized } from '../helpers'

export const createDeal = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const deal_type_data = await DealType.query()
      .findById(body.deal_type_id)
      .catch(() => false)
    if (!deal_type_data) {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
        errors: {
          deal_type: ['Deal type not found with that id']
        }
      })
    }
    if (deal_type_data.name === 'BRAND') {
      var deals = []
      var i = 0,
        len = body.brands.length
      while (i < len) {
        const brand_data = await Brand.query()
          .findById(body.brands[i])
          .catch(() => false)
        if (brand_data) {
          body.brand_id = brand_data.id
          const deal_data = await Deal.query()
            .insert(body)
            .withGraphFetched('[deal_type]')
          deals.push(deal_data)
        } else {
          return res.status(404).json({
            status: 'error',
            message: 'Not Found',
            errors: {
              deal_type: ['Brand not found for ' + body.brands[i]]
            }
          })
        }
        i++
      }
      return {
        status: 'success',
        message: 'Creation Successful',
        data: deals
      }
    } else {
      const deal_data = await Deal.query()
        .insert(body)
        .withGraphFetched('[deal_type]')
      return {
        status: 'success',
        message: 'Creation Successful',
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
    if(body.images){
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
  const { role } = ctx.state.user.user
  if (await checkIfMarketing(role)) {
    const deal_types = DealType.query()
    return {
      status: 'success',
      message: 'Successful',
      data: deal_types
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}
