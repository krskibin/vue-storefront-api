import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from 'src/nestApi/product/product.controller'
import { ProductService } from 'src/nestApi/product/product.service'
import { ConfigModule } from 'src/nestApi/config/config.module'

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
    it(('should return proper result'), async () => {
      const result = ['test'] 
      jest.spyOn(productService, 'list').mockImplementation(() => result)

      expect(await productController.list()).toBe(result)
    })
  })

})
