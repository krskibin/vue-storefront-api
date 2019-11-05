import { ProductController } from '../../../../src/nestApi/product/product.controller'
import { ProductService } from '../../../../src/nestApi/product/product.service'
import { ConfigService } from '../../../../src/nestApi/config/config.service'
import { Dictionary } from 'express-serve-static-core'
import { Request } from 'express'

describe('ProductController', () => {
  let configService: ConfigService
  let productController: ProductController
  let productService: ProductService

  beforeEach(() => {
    configService = new ConfigService({type: 'platform'})
    productService = new ProductService(configService)
    productController = new ProductController(productService)
  })

  describe('list', () => {
    it('should return an array of products', async () => {
      const result = Promise.resolve(['result'])
      const reqMock = { query:
         { skus: 'test' }
        } as Request

      jest.spyOn(productService, 'list').mockImplementation(() => result)

      expect(await productController.list(reqMock)).toBe(await result)
    })
  })
})
