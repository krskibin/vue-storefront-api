import { Controller, Get, Req, HttpException, HttpStatus, Query, BadRequestException } from '@nestjs/common'
import { ProductQuery } from './product.dto'
import { ProductService } from './product.service'
import { Request } from 'express'
import { ApiUseTags } from '@nestjs/swagger'
import { Product } from './product.interface'

@ApiUseTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/list')
  async list<I, S>(@Query() query: ProductQuery): Promise<Product<I,S>>{
    return this.productService.list(query) 
  }

  @Get('/render-list')
  async renderList<I, S>(@Query() query: ProductQuery): Promise<Product<I, S>> {
    return this.productService.renderList(query)
  }
}
