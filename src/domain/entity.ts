import * as UniqueEntityID from 'cuid'
import { EventEmitter } from 'events'

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<T> {
  protected readonly _id: string
  protected props: T
  public static readonly event = new EventEmitter()

  constructor(props: T, id?: string) {
    this._id = id ? id : UniqueEntityID()
    this.props = props
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!isEntity(object)) {
      return false
    }

    return this._id == object._id
  }
}
