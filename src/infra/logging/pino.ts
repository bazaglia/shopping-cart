import { injectable } from 'inversify'
import pino from 'pino'

@injectable()
export class Logger {
  get(): pino.Logger {
    return pino({ prettyPrint: { colorize: true } })
  }
}
