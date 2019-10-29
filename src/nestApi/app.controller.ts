import { Controller, Get } from '@nestjs/common'

@Controller('')
export class AppController {
  @Get()
  root(): string {
    return 'Welcome to new Vue Storefront API version, which is based on NestJS! ';
  }
}