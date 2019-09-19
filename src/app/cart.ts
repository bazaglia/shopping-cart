import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { CartRepository } from 'src/infra/database/repositories/cart'
import { Cart } from 'src/domain/cart'
import { Item } from 'src/domain/item'

@injectable()
export class CartService {
  @inject(TYPES.CartRepository) private repository: CartRepository

  private async _getCart(id: string): Promise<Cart> {
    try {
      const cart = await this.repository.getById(id)
      return cart
    } catch (e) {
      const emptyCart = Cart.create({ id, products: [] })
      return this.repository.create(emptyCart)
    }
  }

  public getById(id: string): Promise<Cart> {
    return this.repository.getById(id)
  }

  public async add(cartId: string, item: Item, sku: number): Promise<Cart> {
    const cart = await this._getCart(cartId)
    cart.add(item, sku)

    return this.repository.update(cart)
  }

  public async remove(cartId: string, itemId: string): Promise<Cart> {
    const cart = await this._getCart(cartId)
    cart.remove(itemId)

    return this.repository.update(cart)
  }

  public async empty(cartId: string): Promise<Cart> {
    const cart = await this._getCart(cartId)
    cart.empty()

    return this.repository.update(cart)
  }
}
