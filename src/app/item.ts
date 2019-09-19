import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { ItemRepository } from 'src/infra/database/repositories/item'
import { Item } from 'src/domain/item'

@injectable()
export class ItemService {
  @inject(TYPES.ItemRepository) private repository: ItemRepository

  public findAll(): Promise<Item[]> {
    return this.repository.findAll()
  }

  public getById(id: string): Promise<Item> {
    return this.repository.getById(id)
  }

  public create(item: Item): Promise<Item> {
    return this.repository.insert(item)
  }
}
