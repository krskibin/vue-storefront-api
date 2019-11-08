import { Injectable } from '@nestjs/common';
import ApiBaseService from '../shared/ApiBase';
import { Cart, CartInfo } from './cart.interface'
import { CreateCartQuery, UpdateCartQuery, CouponQuery } from './cart.dto'

@Injectable()
export class CartService extends ApiBaseService{
  create(query: CreateCartQuery): Promise<Cart[]>{
    const cartProxy = this._getProxy()
    return cartProxy.create(query.token)
  }

  update(cart: UpdateCartQuery, body: Cart) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.update(cart.token, cart.cartId, body.cartItem))
  }

  delete(cart: UpdateCartQuery, body: Cart) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.delete(cart.token, cart.cartId, body.cartItem))
  }

  pull(query: UpdateCartQuery, body: Cart) {
    debugger
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.pull(query.token, query.cartId, body))
  }

  totals(query: UpdateCartQuery, body: Cart) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.totals(query.token, query.cartId, body))
  }

  collectTotals(query: UpdateCartQuery, body: Cart) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.collectTotals(query.token, query.cartId, body.methods))
  }

  applyCoupon(query: CouponQuery) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.applyCoupon(query.token, query.cartId, query.coupon))
  }

  deleteCoupon(query: UpdateCartQuery) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.deleteCoupon(query.token, query.cartId))
  }

  findAllCoupons(query: UpdateCartQuery) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.getCoupon(query.token, query.cartId))
  }

  getShoppingMethods(query: UpdateCartQuery, body: CartInfo) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.getShippingMethods(query.token, query.cartId, body.address))
  }

  getPaymentMethods(query: UpdateCartQuery) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.getPaymentMethods(query.token, query.cartId))
  }

  setShoppingInformation(query: UpdateCartQuery, body: CartInfo) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.setShippingInformation(query.token, query.cartId, body))
  }
}