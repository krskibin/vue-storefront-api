import { Controller, Post, Get, Req, Res, Body, Query } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { ApiUseTags } from '@nestjs/swagger'
import { UserBody, LoginUserBody, RefreshTokenUserBody, LoginUserQuery, UpdateUserBody } from './user.dto'
import { User } from './user.interface'

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() user: UserBody) {
    return await this.userService.create(user)
  }

  @Post('/login')
  async login(@Body() user: LoginUserBody, @Res() res: Response) {
    return this.userService.login(user, res)
  }

  @Post('/refresh')
  async refresh(@Body() user: RefreshTokenUserBody, @Res() res: Response) {
    return await this.userService.refreshToken(user, res)
  }

  @Post('/reset[-P](pa|a)ssword')
  async resetPassword(@Body() user: {email: string}) {
    return await this.userService.resetPassword(user)
  }

  @Get('/me')
  async userInfo(@Query() query: LoginUserQuery) {
    return await this.userService.userInfo(query)
  }

  @Post('/me')
  async userUpdate(@Query() query: LoginUserQuery, @Body() user: UpdateUserBody) {
    return await this.userService.userUpdate(query, user)
  }

  @Get('/order-history')
  async orderHistory(@Query() query: LoginUserQuery ) {
    return await this.userService.orderHistory(query)
  }

  @Post('/change[-P](pa|a)ssword')
  async changePassword(@Query() query: LoginUserQuery, @Body() user: UserBody) {
    return await this.userService.changePassword(query, user)
  }
}
