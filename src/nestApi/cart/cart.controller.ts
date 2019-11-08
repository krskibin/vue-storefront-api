import { Controller, Post, Get, Header, Body, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CartBody, CreateCartQuery, UpdateCartQuery, CouponQuery, CartInfoBody  } from './cart.dto'
import { Cart } from './cart.interface';
import { CartService } from './cart.service';

@ApiUseTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/create')
  async create(@Query() query: CreateCartQuery): Promise<Cart[]> {
    return this.cartService.create(query)
  }

  @Post('/delete')
  async delete(@Query() query: UpdateCartQuery, @Body() body: CartBody): Promise<Cart> {
    return this.cartService.delete(query, body)
  }

  @Post('/update')
  async update(@Query() cart: UpdateCartQuery, @Body() body: CartBody): Promise<Cart[]> {
    return this.cartService.update(cart, body)
  }

  @Get('/totals')
  async totals(@Query() query: UpdateCartQuery, @Body() body: CartBody): Promise<Cart[]> {
    return this.cartService.totals(query, body)
  }

  @Post('/collect-totals')
  @Header('Cache-Control', 'no-cache, no-store')
  async collectTotals(@Query() query: UpdateCartQuery, @Body() body: CartBody): Promise<Cart[]> {
    return this.cartService.collectTotals(query, body)
  }

  @Get('/pull')
  @Header('Cache-Control', 'no-cache, no-store')
  async findAll(@Query() query: UpdateCartQuery, @Body() body: any) {
    return await this.cartService.pull(query, body)
  }

  @Get('/coupon')
  async findAllCoupons(@Query() query: CouponQuery): Promise<any[]> {
    return await this.cartService.findAllCoupons(query)
  }

  @Post('/apply-coupon')
  async applyCoupon(@Query() query: CouponQuery): Promise<any[]> {
    return await this.cartService.applyCoupon(query)
  }

  @Post('/delete-coupon')
  async deleteCoupon(@Query() query: UpdateCartQuery): Promise<any[]> {
    return await this.cartService.deleteCoupon(query)
  }

  @Post('/shipping-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  async addShoppingMethods(@Query() query: UpdateCartQuery, @Body() body: CartInfoBody) {
    return await this.cartService.getShoppingMethods(query, body)
  }

  @Get('/payment-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  async paymentMethods(@Query() query: UpdateCartQuery) {
    return await this.cartService.getPaymentMethods(query)
  }

  @Post('/shipping-information')
  @Header('Cache-Control', 'no-cache, no-store')
  async addShoppingInformation(@Query() query: UpdateCartQuery, @Body() body: CartInfoBody) {
    return await this.cartService.setShoppingInformation(query, body)
  }
}