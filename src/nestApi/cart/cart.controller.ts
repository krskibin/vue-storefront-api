import { Controller, Post, Get, Header, Body, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Cart } from './cart.interface';
import { CartBody, CreateCartQuery, UpdateCartQuery, CouponQuery, CartInfoBody  } from './cart.dto'
import { CartService } from './cart.service';

@ApiUseTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/create')
  async create<I>(@Query() query: CreateCartQuery): Promise<Cart<I>[]> {
    return this.cartService.create(query)
  }

  @Post('/delete')
  async delete(@Query() query: UpdateCartQuery, @Body() body: any): Promise<any[]> {
    return this.cartService.delete(query, body)
  }

  @Post('/update')
  async update<I>(@Query() cart: UpdateCartQuery, @Body() body: CartBody<I>): Promise<Cart<I>[]> {
    return this.cartService.update(cart, body)
  }

  @Get('/totals')
  async totals<I>(@Query() query: UpdateCartQuery, @Body() body: CartBody<I>): Promise<any[]> {
    return this.cartService.totals(query, body)
  }

  @Post('/collect-totals')
  @Header('Cache-Control', 'no-cache, no-store')
  async collectTotals<I>(@Query() query: UpdateCartQuery, @Body() body: CartBody<I>): Promise<Cart<I>[]> {
    return this.cartService.collectTotals(query, body)
  }

  @Get('/pull')
  @Header('Cache-Control', 'no-cache, no-store')
  async findAll<I>(@Query() query: UpdateCartQuery, @Body() body: any): Promise<Cart<I>[]> {
    return this.cartService.pull(query, body)
  }

  @Get('/coupon')
  async findAllCoupons<I>(@Query() query: CouponQuery): Promise<any[]> {
    return this.cartService.findAllCoupons(query)
  }

  @Post('/apply-coupon')
  async applyCoupon<I>(@Query() query: CouponQuery): Promise<any[]> {
    return this.cartService.applyCoupon(query)
  }

  @Post('/delete-coupon')
  async deleteCoupon<I>(@Query() query: UpdateCartQuery): Promise<any[]> {
    return this.cartService.deleteCoupon(query)
  }

  @Post('/shipping-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  async addShoppingMethods<I>(@Query() query: UpdateCartQuery, @Body() body: CartInfoBody) {
    return this.cartService.getShoppingMethods(query, body)
  }

  @Get('/payment-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  async paymentMethods<I>(@Query() query: UpdateCartQuery) {
    return this.cartService.getPaymentMethods(query)
  }

  @Post('/shipping-information')
  @Header('Cache-Control', 'no-cache, no-store')
  async addShoppingInformation<I>(@Query() query: UpdateCartQuery, @Body() body: CartInfoBody) {
    return this.cartService.setShoppingInformation(query, body)
  }
}
