import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from 'src/nestApi/product/product.controller'
import { ProductService } from 'src/nestApi/product/product.service'
import { ConfigModule } from 'src/nestApi/config/config.module'
import { Request } from 'express'

describe('ProductController', () => {
  let productController: ProductController
  let productService: ProductService

  beforeEach(async () => {
    jest.clearAllMocks()
    const productModule: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.register({type: 'product'})],
      controllers: [ProductController],
      providers: [ProductService]
    }).compile()

    productService = productModule.get<ProductService>(ProductService)
    productController = productModule.get<ProductController>(ProductController)
  })

  describe('list', () => {
    it('should return an array of products when request contains skus parameter', async () => {
      const result = Promise.resolve(['result'])
      const reqMock = { query:
         { skus: 'test' }
        } as Request

      jest.spyOn(productService, 'list').mockImplementation(() => result)

      expect(await productController.list(reqMock)).toBe(await result)
    })

    it('should throw exception request, when does not contain skus parameter', async () => {
      expect.assertions(1)  // to fail test when exception does not occur 

      const result = Promise.resolve(['result'])
      const reqMock = { query: {} } as Request

      jest.spyOn(productService, 'list').mockImplementation(() => result)

      try {
        await productController.list(reqMock)
      } catch (err) {
        expect(err.message).toEqual({ error: 'Bad Request', message: 'skus parameter is required', statusCode: 400 })
      }
    })
  })

  describe('render-list', () => {
    it('should return an array of products when request contains skus parameter', async () => {
      const result = Promise.resolve(['result'])
      const reqMock = { query:
         { skus: 'test' }
        } as Request

      jest.spyOn(productService, 'renderList').mockImplementation(() => result)

      expect(await productController.renderList(reqMock)).toBe(await result)
    })

    it('should throw exception request, when does not contain skus parameter', async () => {
      expect.assertions(1)  // to fail test when exception does not occur 

      const result = Promise.resolve(['result'])
      const reqMock = { query: {} } as Request

      jest.spyOn(productService, 'renderList').mockImplementation(() => result)

      try {
        await productController.renderList(reqMock)
      } catch (err) {
        expect(err.message).toEqual({ error: 'Bad Request', message: 'skus parameter is required', statusCode: 400 })
      }
    })

  })
})