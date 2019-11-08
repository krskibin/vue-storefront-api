import { Injectable, BadRequestException } from '@nestjs/common';
import { Request } from 'express-serve-static-core';
import ApiBaseService from '../shared/ApiBase';

@Injectable()
export class CartService extends ApiBaseService{
  create(req: Request ): Promise<any[]>{
    const cartProxy = this._getProxy()
    return cartProxy.create(req.query.token)
  }

  update(cart, body) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.update(cart.token, cart.cardId, body.cartItem))
  }

  delete(req: Request) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.delete(req.query.token, req.query.cartId ? req.query.cartId : null, req.body.cartItem))
  }

  findAll(query: {token?: string, cartId: string}, body: any) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.pull(query.token, query.cartId ? query.cartId : null, body))
  }

  totals(req: Request) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.totals(req.query.token, req.query.cartId ? req.query.cartId : null, req.body))
  }

  collectTotals(req: Request) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.collectTotals(req.query.token, req.query.cartId ? req.query.cartId : null, req.body.methods))
  }

  applyCoupon(req: Request) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.applyCoupon(req.query.token, req.query.cardId ? req.query.cardId: null, req.query.coupon))
  }

  deleteCoupon(req: Request) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.deleteCoupon(req.query.token, req.query.cartId ? req.query.cartId : null))
  }

  findAllCoupons(req: Request) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.getCoupon(req.query.token, req.query.cartId ? req.query.cartId : null))
  }

  getShoppingMethods(req: Request) {
    const cartProxy = this._getProxy()
		return Promise.resolve(cartProxy.getShippingMethods(req.query.token, req.query.cartId ? req.query.cartId : null, req.body.address))
  }

  getPaymentMethods(req: Request) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.getPaymentMethods(req.query.token, req.query.cartId ? req.query.cartId : null))
  }

  setShoppingInformation(req: Request) {
    const cartProxy = this._getProxy()
    return Promise.resolve(cartProxy.setShippingInformation(req.query.token, req.query.cartId ? req.query.cartId : null, req.body))
  }
}