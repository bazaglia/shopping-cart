import { BaseContext } from 'koa'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ItemService } from 'src/app/item'
import { Item } from 'src/domain/item'
import { CartService } from 'src/app/cart'

@injectable()
export class HTTPController {
  @inject(TYPES.ItemService) private _itemService: ItemService
  @inject(TYPES.CartService) private _cartService: CartService

  public async listItems(ctx: BaseContext) {
    const items = await this._itemService.findAll()
    ctx.body = items.map(item => item.unmarshal())
  }

  public async getItem(ctx: BaseContext) {
    const item = await this._itemService.getById(ctx.params.id)
    ctx.body = item.unmarshal()
  }

  public async createItem(ctx: BaseContext) {
    const item = Item.create(ctx.request.body)
    const created = await this._itemService.create(item)
    ctx.body = created.unmarshal()
  }

  public async getCart(ctx: BaseContext) {
    const cart = await this._cartService.getById(ctx.params.id)
    ctx.body = cart.unmarshal()
  }

  public async addToCart(ctx: BaseContext) {
    const { cartId } = ctx.params
    const { itemId, quantity } = ctx.request.body

    const item = await this._itemService.getById(itemId)
    if (!item) {
      throw new Error('Invalid item ID')
    }

    const cart = await this._cartService.add(cartId, item, quantity)
    ctx.body = cart.unmarshal()
  }

  public async removeFromCart(ctx: BaseContext) {
    const { cartId, itemId } = ctx.params

    const cart = await this._cartService.remove(cartId, itemId)
    ctx.body = cart.unmarshal()
  }

  public async emptyCart(ctx: BaseContext) {
    const { cartId } = ctx.params

    await this._cartService.empty(cartId)
    ctx.body = null
  }
}
