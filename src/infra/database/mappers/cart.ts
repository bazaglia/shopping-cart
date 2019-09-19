import { Cart, ICartItem } from 'src/domain/cart'

const getProducts = (products: ICartItem[]) => {
  return products.map(product => ({
    item: product.item,
    sku: product.sku,
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
