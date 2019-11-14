
export interface Item<I> {
  [key: string]: I
} 

export interface Cart<I> {
  cartItem: Item<I>[]
  methods?: any
}

export interface CartInfo {
  address: object
}
