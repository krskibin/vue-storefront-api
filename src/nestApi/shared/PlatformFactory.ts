import { Request } from 'express'
import { IConfig } from 'config'
import {isEmpty} from 'lodash'

export default class PlatformFactory {
  request: Request
  config: IConfig

  constructor(app_config: IConfig) {
    this.config = app_config
  }

  getAdapter(platform: String, type: String, ...constructorParams): any {
    if (isEmpty(this.request)) {
      throw new Error('Platform middleware does not set request for this factory')
    }

    let adapterClass = require(`../../platform/${platform}/${type}`);

    if (!adapterClass) {
      throw new Error(`Invalid adapter ${platform} / ${type}`);
    }

    let adapterInstance = new adapterClass(this.config, this.request, ...constructorParams)
    if (typeof adapterInstance.isValidFor == 'function' && !adapterInstance.isValidFor(type)) {
      throw new Error(`No valid adapter class or adapter is not valid for ${type}`)
    }

    return adapterInstance
  }
}