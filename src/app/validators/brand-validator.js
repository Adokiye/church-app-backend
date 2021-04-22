import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let image = Joi.string()

const BrandValidator = {
  createBrand: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        posist_data: Joi.object()
          .keys({
            customer_key: Joi.string().required()
          })
          .required(),
        cokitchen_id: Joi.string().required(),
      }
    }),
  updateBrand: () =>
    validationMiddleware({
      body: {
        brand_id: Joi.string().required(),

        name: Joi.string(),
        summary: Joi.string(),
        description: Joi.string(),
        logo: Joi.string(),
        images: Joi.array().items(image),
        brand_keywords: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        brand_descriptive_metadatas: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        )
      }
    }),
  getUserBrands: () =>
    validationMiddleware({
      body: {
        lat: Joi.number().required(),
        lng: Joi.number().required()
      }
    })
}

export default BrandValidator
