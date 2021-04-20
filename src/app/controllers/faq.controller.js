import UserSetting from '../models/user_setting'
import UserSavedAddress from '../models/user_saved_address'
import FaqArrangement from '../models/faq_arrangement'
import Faq from '../models/faq'
import { checkIfMarketing } from '../services/RoleService'

import { Unauthorized, UnprocessableEntity, NotFound } from '../helpers'

export const getFaqArrangement = async ctx => {
  const { user } = ctx.state.user

  const faq_arrangement_data = await FaqArrangement.query().catch(() => false)
  if (!faq_arrangement_data) {
    return {
      status: 'success',
      message: "Faq's Arrangement data returned Successfully",
      data: []
    }
  } else {
    return {
      status: 'success',
      message: "Faq's Arrangement data returned Successfully",
      data: faq_arrangement_data[0].faqs
    }
  }
}

export const addNewFaq = async ctx => {
  const { role } = ctx.state.user.user
  const { body } = ctx.request
  if (await checkIfMarketing(role)) {
    const faq = await Faq.query().insert(body)
    let faq_arrangement_data = await FaqArrangement.query().catch(() => false)
    if (!faq_arrangement_data) {
      let faqs = []
      faqs.push(faq)
      console.log(faq)
      faq_arrangement_data = await FaqArrangement.query().insert({
        faqs: JSON.stringify(faqs)
      }).catch((e)=>{console.log(e);throw UnprocessableEntity('invalid data')})
      return {
        status: 'success',
        message: "Faq's Arrangement data returned Successfully",
        data: faq_arrangement_data.faqs
      }
    } else {
      console.log(faq_arrangement_data[0])
      faq_arrangement_data[0].faqs.push(faq)
      faq_arrangement_data[0].faqs = JSON.stringify(faq_arrangement_data[0].faqs)
      faq_arrangement_data = await FaqArrangement.query().patchAndFetchById(
        faq_arrangement_data[0].id,
        faq_arrangement_data[0]
      )
      return {
        status: 'success',
        message: 'Faq data added Successfully',
        data: faq_arrangement_data.faqs
      }
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const updateFaq = async ctx => {
  const { role } = ctx.state.user.user
  const { body } = ctx.request
  if (await checkIfMarketing(role)) {
    const faq_id = body.faq_id
    delete body.faq_id
    const faq_data = await Faq.query()
      .patchAndFetchById(faq_id, body)
      .catch(e => {
        console.log(e)
        return false
      })
    if (!faq_data) {
      throw NotFound('Faq data not found.')
    } else {
      let faq_arrangement_data = await FaqArrangement.query().catch(() => false)
      let foundIndex = faq_arrangement_data[0].faqs.findIndex(
        faq => faq.id == faq_id
      )
      faq_arrangement_data[0].faqs[foundIndex] = faq_data
      faq_arrangement_data[0].faqs = JSON.stringify(faq_arrangement_data[0].faqs)

      faq_arrangement_data = await FaqArrangement.query().patchAndFetchById(
        faq_arrangement_data[0].id,
        faq_arrangement_data[0]
      )
      return {
        status: 'success',
        message: 'Faq updated Successfully',
        ...faq_data
      }
    }
  } else {
    throw Unauthorized('Unauthorized Update')
  }
}

export const updateFaqArrangement = async ctx => {
  const { role } = ctx.state.user.user
  const { body } = ctx.request
  if (await checkIfMarketing(role)) {
    const faq_arrangement = body.faq_arrangement
    let faq_arrangement_data = await FaqArrangement.query().catch(() => false)
    faq_arrangement_data[0].faqs = faq_arrangement
    faq_arrangement_data[0].faqs = JSON.stringify(faq_arrangement_data[0].faqs)

    faq_arrangement_data = await FaqArrangement.query().patchAndFetchById(
      faq_arrangement_data[0].id,
      faq_arrangement_data[0]
    )
    return {
      status: 'success',
      message: 'Faq updated Successfully',
      data:faq_arrangement_data.faqs
    }
  } else {
    throw Unauthorized('Unauthorized Update')
  }
}

export const deleteFaq = async ctx => {
  const { role} = ctx.state.user.user
  const { params } = ctx
  if (await checkIfMarketing(role)) {
  let faq_arrangement_data = await FaqArrangement.query().catch(() => [])
    let foundIndex = faq_arrangement_data[0].faqs.findIndex(
      faq => faq.id == params.id
    )
    console.log(foundIndex)
    delete faq_arrangement_data[0].faqs[foundIndex]
    console.log(faq_arrangement_data)
    faq_arrangement_data[0].faqs = JSON.stringify(faq_arrangement_data[0].faqs)
   
    faq_arrangement_data = await FaqArrangement.query().patchAndFetchById(
      faq_arrangement_data[0].id,
      faq_arrangement_data[0]
    ) .catch(() => {
      throw NotFound('Faq not found')
    })
  
    const faq_data = await Faq.query()
      .deleteById(params.id)
      .catch(() => {
        throw NotFound('Faq with id ' + params.id + ' not found')
      })
    

    return {
      status: 'success',
      message: 'Faq Deleted Successfully'
    }
  } else {
    throw Unauthorized('Unauthorized Delete')
  }
}
