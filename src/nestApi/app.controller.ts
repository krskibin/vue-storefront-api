import { Controller, Get } from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('base')
@Controller('')
export class AppController {
  @Get()
  root(): any[] {
    return [{ message: 'Welcome to new Vue Storefront API based on NestJS' }];
  }
}