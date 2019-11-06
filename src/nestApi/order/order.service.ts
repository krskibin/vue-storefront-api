import { Injectable, BadRequestException, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common'
import { Request } from 'express'
import ApiBaseService from '../shared/ApiBase'
import Ajv from 'ajv'
import { merge } from 'lodash'
import { existsSync } from 'fs'
import jwa from 'jwa'
import config from 'config'
import kue from 'kue'
import { Http2SecureServer } from 'http2'

const hmac = jwa('HS256')

@Injectable()
export class OrderService extends ApiBaseService {

  async create(req: Request) {
    const ajv = new Ajv()
    require('ajv-keywords')(ajv, 'regexp')
    const orderSchema = require('../models/order.schema.js')
		let orderSchemaExtension = {}
		if(existsSync('../models/order.schema.extension.json')) {
			orderSchemaExtension = require('../models/order.schema.extension.json')
    }

    const validate = ajv.compile(merge(orderSchema, orderSchemaExtension))

    if (!validate(req.body)) { // schema validation of upcoming order
      console.dir(validate.errors);
      throw new BadRequestException(validate.errors)
    }
    const incomingOrder = { title: 'Incoming order received on ' + new Date() + ' / ' + req.ip, ip: req.ip, agent: req.headers['user-agent'], receivedAt: new Date(), order: req.body } /* parsed using bodyParser.json middleware */

    console.log(JSON.stringify(incomingOrder))
    const taxConfig = config.get('tax') as any

    for (let product of req.body.products) {
      let key = taxConfig.calculateServerSide ? { priceInclTax: product.priceInclTax, id: null, sku: null } : { price: product.price, id: null, sku: null }
      if (taxConfig.alwaysSyncPlatformPriceOver) {
        key.id = product.id
      } else {
        key.sku = product.sku
      }

      if (taxConfig.usePlatformTotals) {
        if (!hmac.verify(key, product.sgn, config.get('sgn'))) {
          console.error(`Invalid hash for ${product.sku}: ${product.sgn}`)
          return({message: `Invalid signature validation of ${product.sku}`})
        }
      }

      if ((config.get('orders') as any).useServerQueue) {
        try {
          let queue = kue.createQueue(Object.assign(config.get('kue'), { redis: config.get('redis') }))
          const job = queue.create('order', incomingOrder).save((err) => {
            if (err) {
              console.log(err)
              throw new InternalServerErrorException(err.message)
            } else {
              return {jobId: job.id}
            }
          })
        } catch(err) {
          throw new InternalServerErrorException(err.message)
        }
      } else {
        const orderProxy = this._getProxy(req)
        return await orderProxy.create(req.body)
      }
    }
  }
}
