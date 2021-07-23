import {
  Cart,
  UnmarshalledCart,
  UnmarshalledCartItem,
} from '../../../../domain/cart'

const getProducts = (products: UnmarshalledCartItem[]) => {
  return products.map((product) => ({
    item: product.item,
    quantity: product.quantity,
  }))
}

export class CartMapper {
  public static toDomain(raw: UnmarshalledCart): Cart {
    return Cart.create({
      id: raw.id,
      rawProducts: getProducts(raw.products || []),
    })
  }
}
