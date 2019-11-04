import { sgnSrc } from '../../lib/util'
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import ApiBaseService from '../shared/ApiBase'
import config from 'config'
import jwa from 'jwa'

const hmac = jwa('HS256')

@Injectable()
export class ProductService extends ApiBaseService {

  list(req: Request): Promise<any[]>{
    let productProxy = this._getProxy(req)
    return productProxy.list(req.query.skus.split(','))
  }
    
  async renderList(req: Request): Promise<any[]> {
    let productProxy = this._getProxy(req)

    const storeId = req.query.storeId && parseInt(req.query.storeId) > 0 ? req.query.storeId : 1
    let productList = await productProxy.renderList(req.query.skus.split(','), storeId)

    productList.items = productList.items.map((item: any) => {
      let sgnObj = item
      const tax = config.get('tax') as any 
      if (tax.calculateServerSide === true) {
        sgnObj = { priceInclTax: item.price_info.final_price }
      } else {
        sgnObj = { price: item.price_info.extension_attributes.tax_adjustments.final_price }
      }
      item.sgn = hmac.sign(sgnSrc(sgnObj, item), config.get('objHashSecret'))
      return item
    })

    return productList
  }
}
