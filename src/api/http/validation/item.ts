import Joi from 'joi'
import { UnmarshalledItem } from '../../../domain/item'

const schema = Joi.object({
  id: Joi.string().alphanum().min(3).max(30),
  sku: Joi.string().required(),
  displayName: Joi.string().required(),
  price: Joi.number().positive().required(),
})

export const validateCreateItem = (
  body: Record<string, unknown>,
): UnmarshalledItem => {
  const validation = schema.validate(body)

  if (validation.error) {
    throw validation.error
  }

  return validation.value as UnmarshalledItem
}
