import config from 'config'
import jwa from 'jwa'
import { Injectable } from '@nestjs/common'
import BadRequestException from '../shared/bad-request.exception'
import ApiBaseService from '../shared/ApiBase'
import { sgnSrc } from '../../lib/util'
import { ProductQuery } from './product.dto' 
import { Product, Item } from './product.interface'

const hmac = jwa('HS256')

@Injectable()
export class ProductService extends ApiBaseService {

  async list<I, S>(query: ProductQuery): Promise<Product<I, S>>{
    let productProxy = this._getProxy()
    return productProxy.list(query.skus.split(','))
  }
    
  async renderList<I, S>(query: ProductQuery): Promise<Product<I, S>> {
    let productProxy = this._getProxy()
    const storeId = parseInt(query?.storeId) > 0 ? query.storeId : 1

    let productList: Product<I, S> = await productProxy.renderList(query.skus.split(','), storeId).catch(err => {
      throw new BadRequestException(err.errorMessage)
    })

    productList.items = productList.items.map(<I extends {[key: string]: any}>(item: Item<I>) => {
      let sgnObj: object
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
