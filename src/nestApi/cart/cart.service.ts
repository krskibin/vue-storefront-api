import { Injectable } from '@nestjs/common';
import ApiBaseService from '../shared/ApiBase';
import { Cart, CartInfo } from './cart.interface'
import { CreateCartQuery, UpdateCartQuery, CouponQuery } from './cart.dto'

@Injectable()
export class CartService extends ApiBaseService {
  async create<I>(query: CreateCartQuery): Promise<Cart<I>[]> {
    const cartProxy = this._getProxy()
    return cartProxy.create(query.token)
  }

  async update<I>(cart: UpdateCartQuery, body: Cart<I>): Promise<Cart<I>[]> {
    const cartProxy = this._getProxy()
    return cartProxy.update(cart.token, cart.cartId, body.cartItem)
  }

  async delete<I>(cart: UpdateCartQuery, body: any): Promise<any[]> {
    const cartProxy = this._getProxy()
		return cartProxy.delete(cart.token, cart.cartId, body.cartItem)
  }

  async pull<I>(query: UpdateCartQuery, body: Cart<I>): Promise<Cart<I>[]> {
    const cartProxy = this._getProxy()
		return cartProxy.pull(query.token, query.cartId, body)
  }

  async totals<I>(query: UpdateCartQuery, body: Cart<I>): Promise<Cart<I>[]> {
    const cartProxy = this._getProxy()
		return cartProxy.totals(query.token, query.cartId, body)
  }

  async collectTotals<I>(query: UpdateCartQuery, body: Cart<I>): Promise<Cart<I>[]>{
    const cartProxy = this._getProxy()
    return cartProxy.collectTotals(query.token, query.cartId, body.methods)
  }

  async applyCoupon(query: CouponQuery) {
    const cartProxy = this._getProxy()
    return cartProxy.applyCoupon(query.token, query.cartId, query.coupon)
  }

  async deleteCoupon(query: UpdateCartQuery) {
    const cartProxy = this._getProxy()
    return cartProxy.deleteCoupon(query.token, query.cartId)
  }

  async findAllCoupons(query: UpdateCartQuery) {
    const cartProxy = this._getProxy()
		return cartProxy.getCoupon(query.token, query.cartId)
  }

  async getShoppingMethods(query: UpdateCartQuery, body: CartInfo) {
    const cartProxy = this._getProxy()
		return cartProxy.getShippingMethods(query.token, query.cartId, body.address)
  }

  async getPaymentMethods(query: UpdateCartQuery) {
    const cartProxy = this._getProxy()
    return cartProxy.getPaymentMethods(query.token, query.cartId)
  }

  async setShoppingInformation(query: UpdateCartQuery, body: CartInfo) {
    const cartProxy = this._getProxy()
    return cartProxy.setShippingInformation(query.token, query.cartId, body)
  }
}
