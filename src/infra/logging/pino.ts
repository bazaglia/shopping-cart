import { injectable } from 'inversify'
import * as pino from 'pino'

@injectable()
export class Logger {
  get() {
    return pino({ prettyPrint: { colorize: true } })
  }
}
