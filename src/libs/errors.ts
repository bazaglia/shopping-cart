class ExtendableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class Internal extends ExtendableError {
  data: object

  constructor(message: string, data: object) {
    super(message)
    this.data = data
  }
}

export class ValidationError extends ExtendableError {}

export class ResourceNotFound extends ExtendableError {
  data: object

  constructor(resource: string, query: object | string) {
    super(`Resource ${resource} was not found.`)
    this.data = { resource, query }
  }
}
