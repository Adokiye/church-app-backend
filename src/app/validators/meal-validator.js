import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let image = Joi.string()

const MealValidator = {
  updateMeal: () =>
    validationMiddleware({
      body: {
        meal_id: Joi.string().required(),
        summary: Joi.string(),
        description: Joi.string(),
        images: Joi.array().items(image),
        meal_keywords: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        meal_descriptive_metadatas: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        meal_business_metadatas: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        meal_dietary_metadatas: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        meal_allergy_metadatas: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        )
      }
    }),
  getMealAddons: () =>
    validationMiddleware({
      body: {
        meal_id: Joi.string().required(),
        by_category: Joi.boolean().required()
      }
    })
}

export default MealValidator
