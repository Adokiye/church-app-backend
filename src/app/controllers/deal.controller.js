import Brand from '../models/brand'
import Deal from '../models/deal'
import DealType from '../models/deal_type'
import { checkIfAdmin, checkIfMarketing } from '../services/RoleService'
import { Unauthorized } from '../helpers'

export const createDeal = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
   body.max = '0'
   if(body.images){
     body.images = JSON.stringify(body.images)
   }
   const brands = body.brands
   delete body.brands
   console.log(body)
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
        len = brands.length
      while (i < len) {
        const brand_data = await Brand.query()
          .where('id',brands[i].id)
          .catch(() => false)
        if (brand_data) {
          body.brand_id = brand_data[0].id
          const deal_data = await Deal.query()
            .insert(body)
            .withGraphFetched('[deal_type]')
            .catch((e)=>console.log(e))
          deals.push(deal_data)
        } else {
          return res.status(404).json({
            status: 'error',
            message: 'Not Found',
            errors: {
              deal_type: ['Brand not found']
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
      const brand_data = await Brand.query().catch(() => [])
      body.brand_id = brand_data[0].id
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
  const deal_types = await DealType.query().catch(e => [])
  return {
    status: 'success',
    message: 'Successful',
    data: deal_types
  }
}
