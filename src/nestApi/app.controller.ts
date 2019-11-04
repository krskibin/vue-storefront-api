import { Controller, Get } from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('base')
@Controller('')
export class AppController {
  @Get()
  root(): string {
    return 'Welcome to new Vue Storefront API based on NestJS ';
  }
}