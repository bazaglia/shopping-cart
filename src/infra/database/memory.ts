import { injectable } from 'inversify'
import * as cuid from 'cuid'

class Collection {
  private data: any = {}

  async findAll() {
    return Object.entries(this.data).map(([key, value]) => ({
      id: key,
      ...value,
    }))
  }

  async getById(id: string) {
    return this.data[id]
  }

  async insert(value: any) {
    this.data[value.id || cuid()] = value
    return value
  }

  async update(id: string, value: any) {
    this.data[id] = value
    return this.data[id]
  }
}

@injectable()
export class MemoryData {
  public items: Collection = new Collection()
  public cart: Collection = new Collection()
}
