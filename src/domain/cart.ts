import { Entity } from './entity'
import { Item, IItem } from './item'
import { ValidationError } from 'src/libs/errors'

export interface CartItem {
  item: Item
  quantity: number
}

export interface ICartProps {
  id?: string
  couponCode?: string
  products: CartItem[]
}

interface UnmarshalledCartItem {
  item: IItem
  quantity: number
}

interface UnmarshalledCart {
  id: string
  couponCode?: string
  products: UnmarshalledCartItem[]
  totalPrice: number
}

export class Cart extends Entity<ICartProps> {
  constructor({ id, ...data }: ICartProps) {
    super(data, id)
  }

  public static create(props: ICartProps): Cart {
    const instance = new Cart(props)

    if (instance.products) {
      const products = instance.products.map(product => ({
        item: Item.create(product.item),
        quantity: product.quantity,
      }))

      instance.setProducts(products)
    }

    return instance
  }

  public unmarshal(): UnmarshalledCart {
    return {
      id: this.id,
      couponCode: this.couponCode,
      products: this.products.map(product => ({
        item: product.item.unmarshal(),
        quantity: product.quantity,
      })),
      totalPrice: this.totalPrice,
    }
  }

  private discounts = {
    timewax10: 0.05,
    timewax20: 0.2,
    timewax50: 0.5,
  }

  private static validQuantity(quantity: number) {
    return quantity >= 1 && quantity <= 1000
  }

  private setProducts(products: CartItem[]) {
    this.props.products = products
  }

  private emitCartMutation() {
    Cart.event.emit('cartMutated', { cart: this, datetime: new Date() })
  }

  get id(): string {
    return this._id
  }

  get couponCode(): string {
    return this.props.couponCode
  }

  get products(): CartItem[] {
    return this.props.products
  }

  get totalPrice(): number {
    const sum = (acc: number, product: CartItem) => {
      return acc + product.item.price * product.quantity
    }

    const cartValue = this.products.reduce(sum, 0)
    const discountFactor = this.couponCode ? this.discounts[this.couponCode] : 1

    return cartValue * discountFactor
  }

  public add(item: Item, quantity: number) {
    if (!Cart.validQuantity(quantity)) {
      throw new ValidationError(
        'SKU needs to have a quantity between 1 and 1000',
      )
    }

    const index = this.products.findIndex(
      product => product.item.sku === item.sku,
    )

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

      return this.setProducts(products)
    }

    const products = [...this.products, { item, quantity }]
    this.setProducts(products)
    this.emitCartMutation()
  }

  public remove(itemId: string) {
    const products = this.products.filter(product => product.item.id !== itemId)
    this.setProducts(products)
    this.emitCartMutation()
  }

  public empty() {
    this.setProducts([])
    this.emitCartMutation()
  }
}
