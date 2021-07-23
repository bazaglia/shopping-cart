import Joi from 'joi'

type AddToCartPayload = {
  itemId: string
  quantity: number
}

const schema = Joi.object({
  itemId: Joi.string().alphanum().min(3).max(30).required(),
  quantity: Joi.number().positive().required(),
})

export const validateAddToCart = (
  body: Record<string, unknown>,
): AddToCartPayload => {
  const validation = schema.validate(body)

  if (validation.error) {
    throw validation.error
  }

  return validation.value
}
