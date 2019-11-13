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
  create(@Query() query: CreateCartQuery): Promise<Cart[]> {
    return this.cartService.create(query)
  }

  @Post('/delete')
  delete(@Query() query: UpdateCartQuery, @Body() body: CartBody): Promise<Cart> {
    return this.cartService.delete(query, body)
  }

  @Post('/update')
  update(@Query() cart: UpdateCartQuery, @Body() body: CartBody): Promise<Cart[]> {
    return this.cartService.update(cart, body)
  }

  @Get('/totals')
  totals(@Query() query: UpdateCartQuery, @Body() body: CartBody): Promise<Cart[]> {
    return this.cartService.totals(query, body)
  }

  @Post('/collect-totals')
  @Header('Cache-Control', 'no-cache, no-store')
  collectTotals(@Query() query: UpdateCartQuery, @Body() body: CartBody): Promise<Cart[]> {
    return this.cartService.collectTotals(query, body)
  }

  @Get('/pull')
  @Header('Cache-Control', 'no-cache, no-store')
  findAll(@Query() query: UpdateCartQuery, @Body() body: any) {
    return this.cartService.pull(query, body)
  }

  @Get('/coupon')
  findAllCoupons(@Query() query: CouponQuery): Promise<any[]> {
    return this.cartService.findAllCoupons(query)
  }

  @Post('/apply-coupon')
  applyCoupon(@Query() query: CouponQuery): Promise<any[]> {
    return this.cartService.applyCoupon(query)
  }

  @Post('/delete-coupon')
  deleteCoupon(@Query() query: UpdateCartQuery): Promise<any[]> {
    return this.cartService.deleteCoupon(query)
  }

  @Post('/shipping-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  addShoppingMethods(@Query() query: UpdateCartQuery, @Body() body: CartInfoBody) {
    return this.cartService.getShoppingMethods(query, body)
  }

  @Get('/payment-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  paymentMethods(@Query() query: UpdateCartQuery) {
    return this.cartService.getPaymentMethods(query)
  }

  @Post('/shipping-information')
  @Header('Cache-Control', 'no-cache, no-store')
  addShoppingInformation(@Query() query: UpdateCartQuery, @Body() body: CartInfoBody) {
    return this.cartService.setShoppingInformation(query, body)
  }
}
