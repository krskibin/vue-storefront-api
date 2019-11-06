import { Controller, Post, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { ApiUseTags } from '@nestjs/swagger'

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Req() req: Request) {
    return await this.userService.create(req)
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    return this.userService.login(req, res)
  }

  @Post('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    return await this.userService.refreshToken(req, res)
  }

  @Post('/reset[-P](pa|a)ssword')
  async resetPassword(@Req() req: Request) {
    return await this.userService.resetPassword(req)
  }

  @Get('/me')
  async userInfo(@Req() req: Request) {
    return await this.userService.userInfo(req)
  }

  @Post('/me')
  async userUpdate(@Req() req: Request) {
    return await this.userService.userUpdate(req)
  }

  @Get('/order-history')
  async orderHistory(@Req() req: Request) {
    return await this.userService.orderHistory(req)
  }

  @Post('/change[-P](pa|a)ssword')
  async changePassword(@Req() req: Request) {
    return await this.userService.changePassword(req)
  }
  
}
