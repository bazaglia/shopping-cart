import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'

import { CartRepository, ItemRepository } from './domain/repository'

import { HTTPController } from './api/http/controller'
import { HTTPRouter } from './api/http/router'
import { Server, IServer } from './api/http/server'

import { CartService } from './app/cart'
import { ItemService } from './app/item'

import { Logger } from './infra/logging/pino'
import { MemoryData } from './infra/database/memory/memory-data'
import { CartMemoryRepository } from './infra/database/memory/repositories/cart'
import { ItemMemoryRepository } from './infra/database/memory/repositories/item'

const container = new Container()

container.bind(TYPES.HTTPController).to(HTTPController).inSingletonScope()
container.bind(TYPES.HTTPRouter).to(HTTPRouter).inSingletonScope()
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()

container.bind(TYPES.CartService).to(CartService)
container.bind(TYPES.ItemService).to(ItemService)

container.bind(TYPES.Logger).to(Logger).inSingletonScope()
container.bind(TYPES.Database).to(MemoryData).inSingletonScope()
container.bind<CartRepository>(TYPES.CartRepository).to(CartMemoryRepository)
container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMemoryRepository)

export { container }
