import { injectable, inject } from 'inversify'
import { TYPES } from '../../types'

import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as bodyParser from 'koa-bodyparser'
import * as compress from 'koa-compress'

import { errorHandler, devErrorHandler } from './middlewares/errorHandler'
import { HTTPRouter } from './router'
import { Logger } from 'src/infra/logging/pino'

export interface IServer {
  start(): void
}

@injectable()
export class Server {
  @inject(TYPES.HTTPRouter) private _router: HTTPRouter
  @inject(TYPES.Logger) private _logger: Logger

  start() {
    const router = this._router.get()
    const logger = this._logger.get()
    const env = String(process.env)

    router.get('/robots.txt', ctx => {
      ctx.body = 'User-Agent: *\nDisallow: /'
    })

    router.get('/health', ctx => {
      ctx.body = 'OK'
    })

    const app = new Koa()

    app.use(cors())
    app.use(bodyParser())
    app.use(compress())

    app.use(env === 'production' ? errorHandler : devErrorHandler)

    app.use(router.routes())

    app.on('error', err => {
      if (process.env.NODE_ENV !== 'test') {
        logger.error(err)
      }
    })

    app.listen(3000)
  }
}
