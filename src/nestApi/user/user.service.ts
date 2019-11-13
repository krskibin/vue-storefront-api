import config from  'config'
import jwt from 'jwt-simple'
import ApiBaseService from '../shared/ApiBase'
import BadRequestException from '../shared/bad-request.exception'
import { Injectable, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { decryptToken, encryptToken } from '../../lib/util'
import { UserBody, LoginUserBody, RefreshTokenUserBody, LoginUserQuery, UpdateUserBody } from './user.dto'
import { User } from './user.interface'

@Injectable()
export class UserService extends ApiBaseService {

  private _decodeToken(data: {refreshToken: string}) {
    const secretConfig: string = config.get('authHashSecret') ?? config.get('objHashSecret')
    return jwt.decode(decryptToken(data.refreshToken, secretConfig), secretConfig)
  }

  private _encryptToken(data: any) {
    const secretConfig: string = config.get('authHashSecret') ?? config.get('objHashSecret')
    return encryptToken(jwt.encode(data, secretConfig), secretConfig)
  }

  static addUserGroupToken(result: any) {
    if (config.get('usePriceTiers')) {
      const data = {
        group_id: result.group_id,
        id: result.id,
        user: result.email,
      }
      result.groupToken = jwt.encode(data, config.get('authHashSecret') ?? config.get('objHashSecret'))
    }
  }

  create(user: UserBody): Promise<User> {
    const userProxy = this._getProxy()
    return Promise.resolve(userProxy.register(user))
  }

  async login(user: LoginUserBody, res: Response) {
    const userProxy = this._getProxy()
    const loginResult = await userProxy.login(user).catch(err => {
      throw new BadRequestException(err.errorMessage)
    })

    if (config.get('usePriceTiers')) {
      await userProxy.me(loginResult).catch(err => {
        throw new BadRequestException(err.errorMessage)
      })
    }
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      result: loginResult,
      meta: {
        refreshToken: encryptToken(jwt.encode(user, config.get('authHashSecret') ?? config.get('objHashSecret')), config.get('authHashSecret') ?? config.get('objHashSecret'))
      }
    })
  }

  async refreshToken(user: RefreshTokenUserBody, res: Response) {
    const userProxy = this._getProxy()
    const decodedToken = this._decodeToken(user)

    const loginResult = await userProxy.login(decodedToken).catch(err => {
        throw new BadRequestException(err.errorMessage)
      })

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      result: loginResult,
      meta: {
        refreshToken: this._encryptToken(decodedToken)
      }
    })
  }

  async resetPassword(user: {email: string}) {
    const userProxy = this._getProxy()
    return Promise.resolve(userProxy.resetPassword({ email: user.email, template: "email_reset", websiteId: 1 }))
  }

  async userInfo(query: LoginUserQuery) {
    const userProxy = this._getProxy()

    const userInfo = await userProxy.me(query.token).catch(err => {
      throw new BadRequestException(err.errorMessage)
    })
    UserService.addUserGroupToken(userInfo)

    return Promise.resolve(userInfo)
  }

  async userUpdate(query: LoginUserQuery,user: UpdateUserBody) {
		const userProxy = this._getProxy()
		if (user.customer?.groupToken) {
			delete user.customer.groupToken
    }

		const updateResult = await userProxy.update({token: query.token, body: user}).catch(err => {
      throw new BadRequestException(err.errorMessage)
    })

    UserService.addUserGroupToken(updateResult)
    return Promise.resolve(updateResult)
	}

  async orderHistory(query: LoginUserQuery) {
    const userProxy = this._getProxy()
    let orderHistoryResult = await userProxy.orderHistory(query.token).catch(err => {
      throw new BadRequestException(err.errorMessage)
    })
    return orderHistoryResult
  }

  async changePassword(query: LoginUserQuery, body: UserBody) {
    const userProxy = this._getProxy()
    return Promise.resolve(userProxy.changePassword({token: query.token, body: body}))
  }
}
