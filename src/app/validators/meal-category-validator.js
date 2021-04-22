import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let image = Joi.string()

const MealCategoryValidator = {
  updateMealCategory: () =>
    validationMiddleware({
      body: {
        meal_category_id: Joi.string().required(),
        summary: Joi.string(),
        description: Joi.string(),
        images: Joi.array().items(image),
        meal_category_selection_type_id: Joi.string()
      }
    })
}

export default MealCategoryValidator
