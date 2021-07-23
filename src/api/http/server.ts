import { injectable, inject } from 'inversify'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'

import { TYPES } from '../../types'
import { Logger } from '../../infra/logging/pino'
import { errorHandler, devErrorHandler } from './middlewares/error-handler'
import { HTTPRouter } from './router'

export interface IServer {
  start(): void
}

@injectable()
export class Server {
  @inject(TYPES.HTTPRouter) private _router: HTTPRouter
  @inject(TYPES.Logger) private _logger: Logger

  start(): void {
    const router = this._router.get()
    const logger = this._logger.get()
    const env = String(process.env)

    router.get('/robots.txt', (ctx) => {
      ctx.body = 'User-Agent: *\nDisallow: /'
    })

    router.get('/health', (ctx) => {
      ctx.body = 'OK'
    })

    const app = new Koa()

    app.use(cors())
    app.use(bodyParser())
    app.use(compress())

    app.use(env === 'production' ? errorHandler : devErrorHandler)

    app.use(router.routes())

    app.on('error', (err) => {
      if (process.env.NODE_ENV !== 'test') {
        logger.error(err)
      }
    })

    app.listen(3000)
  }
}
