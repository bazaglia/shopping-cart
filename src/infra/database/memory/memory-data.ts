import { injectable } from 'inversify'
import cuid from 'cuid'

class Collection {
  private data: Record<string, unknown> = {}

  async findAll<T extends { id: string }>(): Promise<T[]> {
    return Object.entries(this.data).map(([key, value]) => ({
      id: key,
      ...(value as Record<string, unknown>),
    })) as T[]
  }

  async getById<T>(id: string): Promise<T> {
    return this.data[id] as T
  }

  async insert<T extends { id?: string }>(value: T): Promise<T> {
    this.data[value.id || cuid()] = value
    return value
  }

  async update<T>(id: string, value: T): Promise<T> {
    this.data[id] = value
    return this.data[id] as T
  }
}

@injectable()
export class MemoryData {
  public items = new Collection()
  public cart = new Collection()
}
