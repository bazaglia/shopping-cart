import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../types'
import { ResourceNotFound } from '../../../../libs/errors'
import { Item, UnmarshalledItem } from '../../../../domain/item'
import { ItemRepository } from '../../../../domain/repository'
import { MemoryData } from '../memory-data'
import { ItemMapper } from '../mappers/item'

@injectable()
export class ItemMemoryRepository implements ItemRepository {
  @inject(TYPES.Database) private _database: MemoryData

  async findAll(): Promise<Item[]> {
    const items = await (<Promise<UnmarshalledItem[]>>(
      this._database.items.findAll()
    ))
    return items.map((item) => ItemMapper.toDomain(item))
  }

  async getById(id: string): Promise<Item> {
    const item = await this._database.items.getById<UnmarshalledItem>(id)
    if (!item) {
      throw new ResourceNotFound('Item', { id })
    }
    return ItemMapper.toDomain(item)
  }

  async insert(item: Item): Promise<Item> {
    const dtoItem = item.unmarshal()
    const inserted = await this._database.items.insert(dtoItem)
    return ItemMapper.toDomain(inserted)
  }
}
