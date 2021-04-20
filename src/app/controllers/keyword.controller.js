import BrandDescriptiveMetadata from '../models/brand_descriptive_metadata'
import BrandBusinessMetadata from '../models/brand_business_metadata'
import BrandKeyword from '../models/brand_keyword'
import BrandTag from '../models/brand_tag'
import MealDescriptiveMetadata from '../models/meal_descriptive_metadata'
import MealBusinessMetadata from '../models/meal_business_metadata'
import MealKeyword from '../models/meal_keyword'
import MealTag from '../models/meal_tag'
import MealAllergyMetadata from '../models/meal_allergy_metadata'
import MealDietaryMetadata from '../models/meal_dietary_metadata'
import Cokitchen from '../models/cokitchen'
import CokitchenPolygon from '../models/cokitchen_polygon'
import { checkIfMarketing } from '../services/RoleService'
import { Unauthorized, NotFound } from '../helpers'

export const createBrandBusinessMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const brand_business_metadata_data = await BrandBusinessMetadata.query().insert(
      body
    )
    return {
      status: 'success',
      message: 'Brand Business metadata Created Successfully',
      ...brand_business_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteBrandBusinessMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const brand_business_metadata_data = await BrandBusinessMetadata.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Brand Business Metadata not found')
      })
    return {
      status: 'success',
      message: 'Brand business metadata Deleted Successfully',
      ...brand_business_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createBrandDescriptiveMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const brand_descriptive_metadata_data = await BrandDescriptiveMetadata.query().insert(
      body
    )
    return {
      status: 'success',
      message: 'Brand descriptive metadata Created Successfully',
      ...brand_descriptive_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteBrandDescriptiveMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const brand_descriptive_metadata_data = await BrandDescriptiveMetadata.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Brand descriptive Metadata not found')
      })
    return {
      status: 'success',
      message: 'Brand descriptive metadata Deleted Successfully',
      ...brand_descriptive_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createBrandKeyword = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const brand_keyword_data = await BrandKeyword.query().insert(body)
    return {
      status: 'success',
      message: 'Brand keyword Created Successfully',
      ...brand_keyword_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteBrandKeyword = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const brand_keyword_data = await BrandKeyword.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Brand keyword not found')
      })
    return {
      status: 'success',
      message: 'Brand keyword Deleted Successfully',
      ...brand_keyword_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createBrandTag = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const brand_tag_data = await BrandTag.query().insert(body)
    return {
      status: 'success',
      message: 'Brand tag Created Successfully',
      ...brand_tag_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteBrandTag = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const brand_tag_data = await BrandTag.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Brand tag not found')
      })
    return {
      status: 'success',
      message: 'Brand tag Deleted Successfully',
      ...brand_tag_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createMealBusinessMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_business_metadata_data = await MealBusinessMetadata.query().insert(
      body
    )
    return {
      status: 'success',
      message: 'Mealbusinessmetadata Created Successfully',
      ...meal_business_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteMealBusinessMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_business_metadata_data = await MealBusinessMetadata.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Meal Business Metadata not found')
      })
    return {
      status: 'success',
      message: 'Brand business metadata Deleted Successfully',
      ...meal_business_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createMealDescriptiveMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_descriptive_metadata_data = await MealDescriptiveMetadata.query().insert(
      body
    )
    return {
      status: 'success',
      message: 'Meal descriptive metadata Created Successfully',
      ...meal_descriptive_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteMealDescriptiveMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_descriptive_metadata_data = await MealDescriptiveMetadata.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Meal descriptive Metadata not found')
      })
    return {
      status: 'success',
      message: 'Meal descriptive metadata Deleted Successfully',
      ...meal_descriptive_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createMealKeyword = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_keyword_data = await MealKeyword.query().insert(body)
    return {
      status: 'success',
      message: 'Meal keyword Created Successfully',
      ...meal_keyword_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteMealKeyword = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_keyword_data = await MealKeyword.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Meal keyword not found')
      })
    return {
      status: 'success',
      message: 'Meal keyword Deleted Successfully',
      ...meal_keyword_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createMealTag = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_tag_data = await MealTag.query().insert(body)
    return {
      status: 'success',
      message: 'Meal tag Created Successfully',
      ...meal_tag_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteMealTag = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_tag_data = await MealTag.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Meal tag not found')
      })
    return {
      status: 'success',
      message: 'Meal tag Deleted Successfully',
      ...meal_tag_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createMealDietaryMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_dietary_metadata_data = await MealDietaryMetadata.query().insert(
      body
    )
    return {
      status: 'success',
      message: 'Meal dietary metadata Created Successfully',
      ...meal_dietary_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteMealDietaryMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_dietary_metadata_data = await MealDietaryMetadata.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Meal tag not found')
      })
    return {
      status: 'success',
      message: 'Meal allegy metadata Deleted Successfully',
      ...meal_dietary_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const createMealAllergyMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_allergy_metadata_data = await MealAllergyMetadata.query().insert(
      body
    )
    return {
      status: 'success',
      message: 'Meal allergy metadata Created Successfully',
      ...meal_allergy_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const deleteMealAllergyMetadata = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const meal_allergy_metadata_data = await MealAllergyMetadata.query()
      .deleteById(body.id)
      .catch(() => {
        throw NotFound('Meal tag not found')
      })
    return {
      status: 'success',
      message: 'Meal allegy metadata Deleted Successfully',
      ...meal_allergy_metadata_data
    }
  } else {
    throw Unauthorized('Unauthorized Creation')
  }
}

export const getAllKeywords = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user

  if (await checkIfMarketing(role)) {
    const [
      meal_allergy_metadata,
      meal_business_metadata,
      meal_descriptive_metadata,
      meal_dietary_metadata,
      //meal_tag,
      meal_keyword,
      brand_keyword,
      brand_tag,
      brand_descriptive_metadata,
      brand_business_metadata
    ] = await Promise.all([
      MealAllergyMetadata.query().catch(() => []),
      MealBusinessMetadata.query().catch(() => []),
      MealDescriptiveMetadata.query().catch(() => []),
      MealDietaryMetadata.query().catch(() => []),
      //  MealTag.query().catch(() => []),
      MealKeyword.query().catch(() => []),
      BrandKeyword.query().catch(() => []),
      BrandTag.query().catch(() => []),
      BrandDescriptiveMetadata.query().catch(() => []),
      BrandBusinessMetadata.query().catch(() => [])
    ])
    return {
      status: 'success',
      message: 'Keywords gotten Successfully!',
      meal_allergy_metadata,
      meal_business_metadata,
      meal_descriptive_metadata,
      meal_dietary_metadata,
      // meal_tag,
      meal_keyword,
      brand_keyword,
      brand_tag,
      brand_descriptive_metadata,
      brand_business_metadata
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const updateKeyword = async ctx => {
  const { body } = ctx.request
  const { role } = ctx.state.user.user
  let keyword_type = body.keyword_type
  let keyword_id = body.keyword_id
  delete body.keyword_type
  delete body.keyword_id
  let keywordInDb
  if (await checkIfMarketing(role)) {
    switch (keyword_type) {
      case 'meal_allergy_metadata':
        keywordInDb = await MealAllergyMetadata.query().patchAndFetchById(
          keyword_id,
          body
        )
        break
      case 'meal_keyword':
        keywordInDb = await MealKeyword.query().patchAndFetchById(
          keyword_id,
          body
        )
        break
    }
    return {
      status: 'success',
      message: 'Update Successful',
      ...keywordInDb
    }
  } else {
    throw Unauthorized('Unauthorized')
  }
}

export const getUserMealKeywords = async ctx => {
  const { body } = ctx.request
  const { lat, lng } = body
  const cokitchen_polygons = await CokitchenPolygon.query().withGraphFetched(
    'cokitchen.[brands.[meals]]'
  )
  var cokitchens = []
  var i = 0,
    len = cokitchen_polygons.length
  while (i < len) {
    if (insidePolygon([lat, lng], cokitchen_polygons[i].polygon)) {
      cokitchens.push(cokitchen_polygons[i].cokitchen)
      let meal_keywords = []
      let meals = cokitchen_polygons[i].cokitchen.brands.meals
      for (let j = 0; j < meals.length; j++) {
        meal_keywords = meal_keywords.concat(meals[j].meal_keywords)
      }
      const uniqueArray = meal_keywords.filter((meal_keyword, index) => {
        const _meal_keyword = JSON.stringify(meal_keyword)
        return (
          index ===
          meal_keywords.findIndex(obj => {
            return JSON.stringify(obj) === _meal_keyword
          })
        )
      })
      return {
        status: 'success',
        data: uniqueArray
      }
    }

    i++
  }
}
