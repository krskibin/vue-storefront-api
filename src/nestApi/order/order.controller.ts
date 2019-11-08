import { Controller, Post, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Request } from 'express';

@ApiUseTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  create(@Req() req: Request) {
    this.orderService.create(req)
  }

}
