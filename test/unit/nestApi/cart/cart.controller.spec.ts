import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '../../../../src/nestApi/config/config.module'
import { CartController } from '../../../../src/nestApi/cart/cart.controller'
import { CartService } from '../../../../src/nestApi/cart/cart.service'
import { CartBody } from '../../../../src/nestApi/cart/cart.dto'

describe('Cart controller', () => {
  let cartController: CartController
  let cartService: CartService

  let cartItemMock = {
    qty: 1,
    sku: 'TEST',
    quoteId: 'test123'
  }

  let cartBodyMock = {cartItem: [cartItemMock]}

  beforeEach(async () => {
   jest.clearAllMocks()
   const cartModule: TestingModule = await Test.createTestingModule({
     imports: [ConfigModule.register({type: 'cart'})],
     controllers: [CartController],
     providers: [CartService]
   }).compile()

   cartController = cartModule.get<CartController>(CartController)
   cartService = cartModule.get<CartService>(CartService)
  })

  describe('create endpoint', () => {
    it('should call create service and return cart body when provided query is valid', async () => {
      const queryMock = {
        token: 'test token'
      }
      jest.spyOn(cartService, 'create').mockImplementation(() => Promise.resolve([cartBodyMock]))

      expect(await cartController.create(queryMock)).toEqual([cartBodyMock])
    })
  })

  describe('update endpoint', () => {
    it('should call update service and return updated cart body', async () => {
      const queryMock = {
        cartId: '1',
        token: 'test token'
      }
      jest.spyOn(cartService, 'update').mockImplementation(() => Promise.resolve([cartBodyMock]))
      expect(await cartController.update(queryMock, cartBodyMock)).toEqual([cartBodyMock])
    })
  })
})
