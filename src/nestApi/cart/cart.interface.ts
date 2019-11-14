
export interface Item {
  qty: number
  sku: string
  quoteId: string
} 

export interface Cart {
  cartItem: Item[]
  methods?: any
}

export interface CartInfo {
  address: object
}
