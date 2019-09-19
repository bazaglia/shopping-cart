import { Entity } from './entity'
import { IItem } from './item'

export interface ICartItem {
  item: IItem
  sku: number
}

export interface ICart {
  id?: string
  couponCode?: string
  products: ICartItem[]
}

export class Cart extends Entity<ICart> {
  constructor(props: ICart) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: ICart): Cart {
    const instance = new Cart(props)
    return instance
  }

  public unmarshal(): ICart {
    return {
      id: this.id,
      couponCode: this.couponCode,
      products: this.products,
    }
  }

  get id(): string {
    return this._id
  }

  get couponCode(): string {
    return this.props.couponCode
  }

  get products(): ICartItem[] {
    return this.props.products
  }

  get totalPrice(): number {
    return 999
  }

  addItem(item: IItem, sku: number) {
    if (Cart.validSku(sku)) {
      return this.props.products.push({
        item,
        sku,
      })
    }
  }

  private static validSku(sku: number) {
    if (sku > 1 && sku <= 1000) {
      return true
    } else {
      throw new Error('SKU needs to have a quantity between 1 and 1000')
    }
  }
}
