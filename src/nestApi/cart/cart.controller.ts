import { Controller, Post, Delete, Req, Put, Get, Query, Header } from '@nestjs/common';
import { Request } from 'express';
import { CartService } from './cart.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/create')
  async create(@Req() req: Request) {
    return await this.cartService.create(req)
  }

  @Delete('/delete')
  async delete(@Req() req: Request) {
    return await this.cartService.delete(req)
  }

  @Get('/totals')
  async totals(@Req() req: Request) {
    return await this.cartService.totals(req)
  }

  @Put('/update')
  async update(@Req() req: Request): Promise<any[]> {
    return await this.cartService.update(req)
  }

  @Get('/coupon')
  async findAllCoupons(@Req() req: Request): Promise<any[]> {
    return await this.cartService.findAllCoupons(req)
  }

  @Post('/apply-coupon')
  async applyCoupon(@Req() req: Request): Promise<any[]> {
    return await this.cartService.applyCoupon(req)
  }

  @Delete('/delete-coupon')
  async deleteCoupon(@Req() req: Request): Promise<any[]> {
    return await this.cartService.deleteCoupon(req)
  }

  @Get('/pull')
  @Header('Cache-Control', 'no-cache, no-store')
  async findAll(@Req() req: Request) {
    return await this.cartService.findAll(req)
  }

  @Post('/shopping-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  async addShoppingMethods(@Req() req: Request) {
    return await this.cartService.getShoppingMethods(req)
  }

  @Get('/payment-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  async paymentMethods(@Req() req: Request) {
    return await this.cartService.getPaymentMethods(req)
  }

  @Post('/shipping-information')
  @Header('Cache-Control', 'no-cache, no-store')
  async addShoppingInformation(@Req() req: Request) {
    return await this.cartService.setShoppingInformation(req)
  }

  @Post('/collect-totals')
  @Header('Cache-Control', 'no-cache, no-store')
  async collectTotals(@Req() req: Request) {
    return await this.cartService.collectTotals(req)
  }
}