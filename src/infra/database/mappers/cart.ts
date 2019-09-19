import { Cart, CartItem } from 'src/domain/cart'

const getProducts = (products: CartItem[]) => {
  return products.map(product => ({
    item: product.item,
    quantity: product.quantity,
  }))
}

export class CartMapper {
  public static toDomain(raw: any): Cart {
    return Cart.create({
      id: raw.id,
      couponCode: raw.couponCode,
      products: getProducts(raw.products || []),
    })
  }
}
