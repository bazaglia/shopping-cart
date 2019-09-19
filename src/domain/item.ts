import { Entity } from './entity'

export interface IItem {
  id?: string
  displayName: string
  description: string
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
      displayName: this.displayName,
      description: this.description,
      price: parseFloat(this.price.toString()),
    }
  }

  get id(): string {
    return this._id
  }

  get displayName(): string {
    return this.props.displayName
  }

  get description(): string {
    return this.props.description
  }

  get price(): number {
    return this.props.price
  }
}
