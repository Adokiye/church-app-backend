import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let image = Joi.string()

let brand = Joi.object().keys()

const DealsValidator = {
  createDeal: () =>
    validationMiddleware({
      body: {
        deal_type_id: Joi.string().required(),
        deal_value_type_id: Joi.string().required(),
        deal_requirement_type_id: Joi.string().required(),
        deal_eligibility_type_id: Joi.string().required(),
        cokitchen_id: Joi.string(),
        brands: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        title: Joi.string().required(),
        heading: Joi.string().required(),
        discount_code: Joi.string().required(),

        body: Joi.string().required(),
        images: Joi.array().items(image).required(),
        specific_customers: Joi.array().items(image),
        fixed_amount: Joi.string(),

        rate: Joi.number().required(),
        min_amount: Joi.string(),
        max_amount: Joi.string(),

        min_items: Joi.string(),
        max_items: Joi.string(),

        to_expire_date: Joi.date().required(),
        to_expire_time: Joi.string().required(),
        to_start_date: Joi.date().required(),
        to_start_time: Joi.string().required(),
        post: Joi.bool()
      }
    }),
  createPost: () =>
    validationMiddleware({
      body: {
        cokitchen_id: Joi.string().required(),
        title: Joi.string().required(),
        heading: Joi.string().required(),

        body: Joi.string().required(),
        images: Joi.array().items(image).required(),
        to_expire_date: Joi.date().required(),
        to_expire_time: Joi.string().required(),
        to_start_date: Joi.date().required(),
        to_start_time: Joi.string().required()
      }
    }),
  updateDeal: () =>
    validationMiddleware({
      body: {
        deal_type_id: Joi.string(),
        deal_value_type_id: Joi.string(),
        deal_requirement_type_id: Joi.string(),
        deal_eligibility_type_id: Joi.string(),

        brands: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        title: Joi.string(),
        heading: Joi.string(),
        discount_code: Joi.string(),

        body: Joi.string(),
        images: Joi.array().items(image),
        rate: Joi.number(),
        min_amount: Joi.string(),
        max_amount: Joi.string(),

        min_items: Joi.string(),
        max_items: Joi.string(),

        to_expire_date: Joi.date(),
        to_expire_time: Joi.string(),
        to_start_date: Joi.date(),
        to_start_time: Joi.string(),
        specific_customers: Joi.array().items(image),
        fixed_amount: Joi.string()
      }
    }),
  updateCokitchenPostsArrangement: () =>
    validationMiddleware({
      body: {
        posts: Joi.array()
          .items(
            Joi.object().keys({
              title: Joi.string().required(),
              heading: Joi.string().required(),
              id: Joi.string().required(),
              body: Joi.string().required(),
              images: Joi.array().items(image).required(),
              to_expire_date: Joi.date().required(),
              to_expire_time: Joi.string().required(),
              to_start_date: Joi.date().required(),
              to_start_time: Joi.string().required(),
              deal_id: Joi.string()
            })
          )
          .required(),
        cokitchen_id: Joi.string().required()
      }
    })
}

export default DealsValidator
