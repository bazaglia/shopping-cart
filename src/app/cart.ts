import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { Item } from '../domain/item'
import { Cart } from '../domain/cart'
import { CartRepository } from '../domain/repository'

@injectable()
export class CartService {
  @inject(TYPES.CartRepository) private repository: CartRepository

  private async _getCart(id: string): Promise<Cart> {
    try {
      const cart = await this.repository.getById(id)
      return cart
    } catch (e) {
      const emptyCart = Cart.create({ id })
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
