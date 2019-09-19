import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'

import * as Router from '@koa/router'

import { HTTPController } from './controller'
import { BaseContext } from 'koa'

@injectable()
export class HTTPRouter {
  @inject(TYPES.HTTPController) private _controller: HTTPController

  get() {
    return new Router()
      .get('/item', (ctx: BaseContext) => this._controller.listItems(ctx))
      .get('/item/:id', (ctx: BaseContext) => this._controller.getItem(ctx))
      .post('/item', (ctx: BaseContext) => this._controller.createItem(ctx))
      .get('/cart/:id', (ctx: BaseContext) => this._controller.getCart(ctx))
      .post('/cart/:cartId/item', (ctx: BaseContext) =>
        this._controller.addToCart(ctx),
      )
      .delete('/cart/:cartId/item/:itemId', (ctx: BaseContext) =>
        this._controller.removeFromCart(ctx),
      )
      .post('/cart/:cartId/clean', (ctx: BaseContext) =>
        this._controller.emptyCart(ctx),
      )
  }
}
