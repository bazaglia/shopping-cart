const TYPES = {
  Logger: Symbol.for('Logger'),
  Database: Symbol.for('Database'),

  Server: Symbol.for('Server'),
  HTTPController: Symbol.for('HTTPController'),
  HTTPRouter: Symbol.for('HTTPRouter'),

  CartService: Symbol.for('CartService'),
  CartRepository: Symbol.for('CartRepository'),
  ItemService: Symbol.for('ItemService'),
  ItemRepository: Symbol.for('ItemRepository'),
}

export { TYPES }
