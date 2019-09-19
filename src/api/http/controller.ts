import { BaseContext } from 'koa'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ItemService } from 'src/app/item'
import { Item } from 'src/domain/item'

@injectable()
export class HTTPController {
  @inject(TYPES.ItemService) private _itemService: ItemService

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
    const body = await this._itemService.create(item)
    ctx.body = body
  }
}
