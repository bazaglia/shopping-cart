import { injectable, inject } from 'inversify'
import { TYPES } from '../../../types'

import { MemoryData } from '../memory'
import { Cart } from 'src/domain/cart'
import { CartMapper } from '../mappers/cart'

interface ICartRepository {
  getById(id: string): Promise<Cart>
}

@injectable()
export class CartRepository implements ICartRepository {
  @inject(TYPES.Database) private _database: MemoryData

  async getById(id: string) {
    return this._database.cart.getById(id)
  }
}
