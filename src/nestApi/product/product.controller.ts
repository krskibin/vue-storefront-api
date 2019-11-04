import { Controller, Get, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/list')
  async list(@Req() req: Request): Promise<any[]> {
    if (!req.query.skus) {
      throw new HttpException('skus parameter is required', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.productService.list(req) 
  }

  @Get('/render-list')
  async renderList(@Req() req: Request, @Query('skus') skus: string): Promise<any[]> {
    if (!skus) {
      throw new HttpException('skus parameter is required', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.productService.renderList(req)
  }
}
