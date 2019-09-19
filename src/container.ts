import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'

import { Logger } from './infra/logging/pino'
import { MemoryData } from './infra/database/memory'

import { HTTPController } from './api/http/controller'
import { HTTPRouter } from './api/http/router'
import { Server, IServer } from './api/http/Server'

import { ItemService } from './app/item'
import { ItemRepository } from './infra/database/repositories/item'

const container = new Container()

container
  .bind(TYPES.Logger)
  .to(Logger)
  .inSingletonScope()

container
  .bind(TYPES.Database)
  .to(MemoryData)
  .inSingletonScope()

container
  .bind(TYPES.HTTPController)
  .to(HTTPController)
  .inSingletonScope()

container
  .bind(TYPES.HTTPRouter)
  .to(HTTPRouter)
  .inSingletonScope()

container
  .bind<IServer>(TYPES.Server)
  .to(Server)
  .inSingletonScope()

container.bind(TYPES.ItemService).to(ItemService)
container.bind(TYPES.ItemRepository).to(ItemRepository)

export { container }
