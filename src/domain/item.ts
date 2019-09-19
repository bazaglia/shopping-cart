import { Entity } from './entity'

export interface IItem {
  id?: string
  sku: string
  displayName: string
  price: number
}

export class Item extends Entity<IItem> {
  constructor(props: IItem) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: IItem): Item {
    const instance = new Item(props)
    return instance
  }

  public unmarshal(): IItem {
    return {
      id: this.id,
      sku: this.sku,
      displayName: this.displayName,
      price: parseFloat(this.price.toString()),
    }
  }

  get id(): string {
    return this._id
  }

  get sku(): string {
    return this.props.sku
  }

  get displayName(): string {
    return this.props.displayName
  }

  get price(): number {
    return this.props.price
  }
}
