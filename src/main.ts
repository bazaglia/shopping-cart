import 'reflect-metadata'

import { container } from './container'
import { TYPES } from './types'

import { IServer } from './api/http/Server'

const logger = container.get(TYPES.Logger)

const start = async () => {
  const server = container.get<IServer>(TYPES.Server)
  return server.start()
}

start()
// .then(() => logger.info('Started server...'))
// .catch(error => {
//   logger.error(error.stack)
//   process.exit()
// })
