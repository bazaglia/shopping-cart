import * as boom from '@hapi/boom'
import * as errors from '../../../libs/errors'
import { BaseContext } from 'koa'

const mapErrorToHttpResponse = (err: any) => {
  if (err.isBoom) {
    return err
  }

  if (err instanceof errors.ResourceNotFound) {
    return boom.notFound(err.message)
  }

  if (err instanceof errors.ValidationError) {
    return boom.badRequest(err.message)
  }

  return boom.badImplementation("Server couldn't handle your request")
}

export const errorHandler = async (
  ctx: BaseContext,
  next: () => Promise<any>,
) => {
  try {
    await next()
  } catch (err) {
    const httpError = mapErrorToHttpResponse(err)

    ctx.status = httpError.output.statusCode
    ctx.body = {
      ...httpError.output.payload,
      ...(httpError.data ? { data: httpError.data } : {}),
    }

    ctx.app.emit('error', err, ctx)
  }
}

export const devErrorHandler = async (
  ctx: BaseContext,
  next: () => Promise<any>,
) => {
  try {
    await next()
  } catch (err) {
    const httpError = mapErrorToHttpResponse(err)

    ctx.status = httpError.output.statusCode
    ctx.body = {
      ...httpError.output.payload,
      ...(httpError.data ? { data: httpError.data } : {}),
      stack: err.stack,
    }

    ctx.app.emit('error', err, ctx)
  }
}
