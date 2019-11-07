import { Injectable, BadRequestException, Req, HttpStatus } from '@nestjs/common'
import { decryptToken, encryptToken } from '../../lib/util'
import { Request, Response } from 'express'
import { existsSync } from 'fs'
import { merge } from 'lodash'
import ApiBaseService from '../shared/ApiBase'
import config from  'config'
import jwt from 'jwt-simple'
import Ajv from 'ajv'

@Injectable()
export class UserService extends ApiBaseService {
  static addUserGroupToken(config, result) {
    if (config.get('usePriceTiers')) {
      const data = {
        group_id: result.group_id,
        id: result.id,
        user: result.email,
      }

      result.groupToken = jwt.encode(data, config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret'))
    }
  }

  create(req: Request) {
		const ajv = new Ajv();
    const userRegisterSchema = require('../../models/userRegister.schema.json')
    let userRegisterSchemaExtension = {}

    if(existsSync('../models/userRegister.schema.extension.json')) {
			userRegisterSchemaExtension = require('../models/userRegister.schema.extension.json');
		}
		const validate = ajv.compile(merge(userRegisterSchema, userRegisterSchemaExtension))

		if (!validate(req.body)) { // schema validation of upcoming order
      throw new BadRequestException(validate.errors)
		}

    const userProxy = this._getProxy(req)
    return Promise.resolve(userProxy.register(req.body))
  }

  async login(req: Request, res: Response) {
    const userProxy = this._getProxy(req)
    const loginResult = await userProxy.login(req.body)
    if (config.get('usePriceTiers')) {
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        result: loginResult,
        meta: {
          refreshToken: encryptToken(jwt.encode(req.body, config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret')), config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret'))
        }
      })
    } else {
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        result: loginResult,
        meta: {
				  refreshToken: encryptToken(jwt.encode(req.body, config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret')), config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret'))
        }
      })

    }
  }

  async refreshToken(req: Request, res: Response) {
    const userProxy = this._getProxy(req)

    if (!req.body || !req.body.refreshToken) {
      throw new BadRequestException('No refresh token provided')
    }

    try {
    	const decodedToken = jwt.decode(req.body ? decryptToken(req.body.refreshToken, config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret')) : '', config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret'))

      if (!decodedToken) {
        throw new BadRequestException('Invalid refresh token provided')
      }
      
      const loginResult = await userProxy.login(decodedToken)
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        result: loginResult,
        meta: {
          refreshToken: encryptToken(jwt.encode(decodedToken, config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret')), config.get('authHashSecret') ? config.get('authHashSecret') : config.get('objHashSecret'))
        }
      })
    } catch(err) {
      throw new BadRequestException(err)
    }
  }

  async resetPassword(req: Request) {
    const userProxy = this._getProxy(req)

    if (!req.body.email) {
      throw new BadRequestException('Invalid e-mail provided')
    }

    return Promise.resolve(userProxy.resetPassword({ email: req.body.email, template: "email_reset", websiteId: 1 }))
  }

  async userInfo(req: Request) {
    const userProxy = this._getProxy(req)

    const userInfo = await userProxy.me(req.query.token)
    UserService.addUserGroupToken(config, userInfo)

    return Promise.resolve(userInfo)
  }

  async userUpdate(req: Request) {
    const ajv = new Ajv();
		const userProfileSchema = require('../../models/userProfile.schema.json')
		let userProfileSchemaExtension = {};
		if(existsSync('../../models/userProfile.schema.extension.json')) {
			userProfileSchemaExtension = require('../../models/userProfile.schema.extension.json');
		}
		const validate = ajv.compile(merge(userProfileSchema, userProfileSchemaExtension))

		if (req.body.customer && req.body.customer.groupToken) {
			delete req.body.customer.groupToken
		}

		if (!validate(req.body)) {
			console.dir(validate.errors);
      throw new BadRequestException(validate.errors)
		}

		const userProxy = this._getProxy(req)
		const updateResult = await userProxy.update({token: req.query.token, body: req.body})
    UserService.addUserGroupToken(config, updateResult)
    return Promise.resolve(updateResult)
	}


  async orderHistory(req: Request) {
    const userProxy = this._getProxy(req)
    return Promise.resolve(userProxy.orderHistory(req.query.token))
  }

  async changePassword(req: Request) {
    const userProxy = this._getProxy(req)
    return Promise.resolve(userProxy.changePassword({token: req.query.token, body: req.body}))
  }
}
