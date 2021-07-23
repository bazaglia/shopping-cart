import { Cart } from './cart'
import { Item } from './item'

export interface CartRepository {
  getById(id: string): Promise<Cart>
  create(cart: Cart): Promise<Cart>
  update(cart: Cart): Promise<Cart>
}

export interface ItemRepository {
  findAll(): Promise<Item[]>
  getById(id: string): Promise<Item>
  insert(item: Item): Promise<Item>
}
