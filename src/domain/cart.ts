import { ValidationError } from '../libs/errors'
import { Entity } from './entity'
import { Item, UnmarshalledItem } from './item'

export interface CartItem {
  item: Item
  quantity: number
}

export interface UnmarshalledCartItem {
  item: UnmarshalledItem
  quantity: number
}

export interface UnmarshalledCart {
  id: string
  products: UnmarshalledCartItem[]
  totalPrice: number
}

export interface CartProps {
  id?: string
  rawProducts?: UnmarshalledCartItem[]
}

export class Cart extends Entity<CartProps> {
  private _products: CartItem[]

  private constructor({ id, ...data }: CartProps) {
    super(data, id)
  }

  public static create(props: CartProps): Cart {
    const instance = new Cart(props)
    instance.products = instance.props.rawProducts || []
    return instance
  }

  public unmarshal(): UnmarshalledCart {
    return {
      id: this.id,
      products: this.products.map((product) => ({
        item: product.item.unmarshal(),
        quantity: product.quantity,
      })),
      totalPrice: this.totalPrice,
    }
  }

  private static validQuantity(quantity: number) {
    return quantity >= 1 && quantity <= 1000
  }

  get id(): string {
    return this._id
  }

  get totalPrice(): number {
    const sum = (acc: number, product: CartItem) => {
      return acc + product.item.price * product.quantity
    }

    return this.products.reduce(sum, 0)
  }

  get products(): CartItem[] {
    return this._products
  }

  set products(products: CartItem[] | UnmarshalledCartItem[]) {
    this._products = products.map((p) => ({
      item: p.item instanceof Item ? p.item : Item.create(p.item),
      quantity: p.quantity,
    }))
  }

  public add(item: Item, quantity: number): void {
    if (!Cart.validQuantity(quantity)) {
      throw new ValidationError(
        'SKU needs to have a quantity between 1 and 1000',
      )
    }

    const index = this.products.findIndex((p) => p.item.sku === item.sku)

    if (index > -1) {
      const product = {
        ...this.products[index],
        quantity: this.products[index].quantity + quantity,
      }

      if (!Cart.validQuantity(product.quantity)) {
        throw new ValidationError('SKU exceeded allowed quantity')
      }

      const products = [
        ...this.products.slice(0, index),
        product,
        ...this.products.slice(index + 1),
      ]

      this.products = products
    } else {
      this.products = [...this.products, { item, quantity }]
    }
  }

  public remove(itemId: string): void {
    const products = this.products.filter(
      (product) => product.item.id !== itemId,
    )
    this.products = products
  }

  public empty(): void {
    this.products = []
  }
}
