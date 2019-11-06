import { Controller, Get, Req, HttpException, HttpStatus, Query, BadRequestException } from '@nestjs/common';
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
      throw new BadRequestException('skus parameter is required')
    }
    return this.productService.list(req) 
  }

  @Get('/render-list')
  async renderList(@Req() req: Request): Promise<any[]> {
    if (!req.query.skus) {
      throw new BadRequestException('skus parameter is required')
    }
    return this.productService.renderList(req)
  }
}
