import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '../../../../src/nestApi/config/config.module'
import { CartService } from '../../../../src/nestApi/cart/cart.service'
import { CartController } from '../../../../src/nestApi/cart/cart.controller'

const getProxyMock = () => ({
  create: () => cartMock
})

const cartMock = {
  cartItem: {
    sku: 'test sku'
  }
}

jest.mock('../../../../src/nestApi/shared/ApiBase', () => {
  return function () {
    this._getProxy = getProxyMock
    this.constructor = jest.fn()
  }
})

describe('Cart service', () => {
  let cartService: CartService

  beforeEach(async () => {
    jest.clearAllMocks()
    const cartModule: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.register({type: 'cart'})],
      controllers: [CartController],
      providers: [CartService]
    }).compile()

    cartService = cartModule.get<CartService>(CartService)
  })

  describe('Cart service', () => {
    const queryMock = {
      token: 'test token'
    }
    it('should create cart object', async () => {
      expect(await cartService.create(queryMock)).toEqual(cartMock)
    })
  })
})
