import { injectable, inject } from 'inversify'
import { TYPES } from '../../../types'
import { ResourceNotFound } from 'src/libs/errors'

import { MemoryData } from '../memory'
import { Cart } from 'src/domain/cart'
import { CartMapper } from '../mappers/cart'

interface ICartRepository {
  getById(id: string): Promise<Cart>
  update(cart: Cart): Promise<Cart>
}

@injectable()
export class CartRepository implements ICartRepository {
  @inject(TYPES.Database) private _database: MemoryData

  async getById(id: string): Promise<Cart> {
    const cart = await this._database.cart.getById(id)
    if (!cart) {
      throw new ResourceNotFound('Cart', { id })
    }
    return CartMapper.toDomain(cart)
  }

  async create(cart: Cart): Promise<Cart> {
    const dtoCart = cart.unmarshal()
    const inserted = await this._database.cart.insert(dtoCart)
    return CartMapper.toDomain(inserted)
  }

  async update(cart: Cart): Promise<Cart> {
    const dtoCart = cart.unmarshal()
    const updated = await this._database.cart.update(cart.id, dtoCart)
    return CartMapper.toDomain(updated)
  }
}
