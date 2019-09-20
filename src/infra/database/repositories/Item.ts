import { injectable, inject } from 'inversify'
import { TYPES } from '../../../types'
import { ResourceNotFound } from 'src/libs/errors'

import { MemoryData } from '../memory'
import { Item } from 'src/domain/item'
import { ItemMapper } from '../mappers/item'

interface IItemRepository {
  findAll(): Promise<Item[]>
  getById(id: string): Promise<any>
  insert(item: Item): Promise<Item>
}

@injectable()
export class ItemRepository implements IItemRepository {
  @inject(TYPES.Database) private _database: MemoryData

  async findAll() {
    const items = await (<Promise<Item[]>>this._database.items.findAll())
    return items.map(item => ItemMapper.toDomain(item))
  }

  async getById(id: string) {
    const item = await this._database.items.getById(id)
    if (!item) {
      throw new ResourceNotFound('Item', { id })
    }
    return ItemMapper.toDomain(item)
  }

  async insert(item: Item) {
    const dtoItem = item.unmarshal()
    const inserted = await this._database.items.insert(dtoItem)
    return ItemMapper.toDomain(inserted)
  }
}
