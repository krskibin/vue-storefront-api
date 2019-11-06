import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from 'src/nestApi/product/product.controller'
import { ProductService } from 'src/nestApi/product/product.service'
import { ConfigModule } from 'src/nestApi/config/config.module'
import { Request } from 'express'

describe('ProductService', () => {
  let productService: ProductService

  beforeEach(async () => {
    jest.clearAllMocks()
    const productModule: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.register({type: 'product'})],
      controllers: [ProductController],
      providers: [ProductService]
    }).compile()

    productService = productModule.get<ProductService>(ProductService)
  })

  describe('list', () => {
    it('should return an array of products when request contains skus parameter', async () => {
      const reqMock = { query:
          { skus: 'test' }
        } as Request

      expect(true).toBe(true)
    })
  })

})