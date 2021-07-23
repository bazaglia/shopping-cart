import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../types'
import { ResourceNotFound } from '../../../../libs/errors'
import { Cart, UnmarshalledCart } from '../../../../domain/cart'
import { CartRepository } from '../../../../domain/repository'
import { MemoryData } from '../memory-data'
import { CartMapper } from '../mappers/cart'

@injectable()
export class CartMemoryRepository implements CartRepository {
  @inject(TYPES.Database) private _database: MemoryData

  async getById(id: string): Promise<Cart> {
    const cart = await this._database.cart.getById<UnmarshalledCart>(id)
    if (!cart) {
      throw new ResourceNotFound('Cart', { id })
    }
    return CartMapper.toDomain(cart)
  }

  async create(cart: Cart): Promise<Cart> {
    const dtoCart = cart.unmarshal()
    const inserted = await this._database.cart.insert<UnmarshalledCart>(dtoCart)
    return CartMapper.toDomain(inserted)
  }

  async update(cart: Cart): Promise<Cart> {
    const dtoCart = cart.unmarshal()
    const updated = await this._database.cart.update<UnmarshalledCart>(
      cart.id,
      dtoCart,
    )

    return CartMapper.toDomain(updated)
  }
}
