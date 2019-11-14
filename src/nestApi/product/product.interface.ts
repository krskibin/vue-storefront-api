export interface Item<I> {
  [key: string]: I
}

export interface Product<I, S> {
  items: Array<Item<I>>
  search_criteria: S,
  total_count: number
}
