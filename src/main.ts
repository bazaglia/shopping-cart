import 'reflect-metadata'

import { container } from './container'
import { TYPES } from './types'
import { IServer } from './api/http/server'

const start = async () => {
  const server = container.get<IServer>(TYPES.Server)
  return server.start()
}

start()
console.log('Listening on http://localhost:3000')
