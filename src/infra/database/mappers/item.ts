import { Item } from 'src/domain/item'

export class ItemMapper {
  public static toDomain(raw: any): Item {
    return Item.create({
      id: raw.id,
      displayName: raw.displayName,
      description: raw.description,
      price: raw.price,
    })
  }
}
