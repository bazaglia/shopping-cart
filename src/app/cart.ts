import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { CartRepository } from 'src/infra/database/repositories/cart'
import { Cart } from 'src/domain/cart'

@injectable()
export class CartService {
  @inject(TYPES.CartRepository) private repository: CartRepository

  public get(): Promise<Cart> {
    return this.repository.getById('single-cart')
  }
}
