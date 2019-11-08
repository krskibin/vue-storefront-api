import { Inject } from '@nestjs/common'
import { Request } from 'express'
import config from 'config'
import PlatformFactory from '../shared/PlatformFactory'
import { ConfigService } from '../config/config.service';

export default class ApiBaseService {
  readonly platform: string
  readonly type: string

  constructor(@Inject('ConfigService') config: ConfigService) {
    this.platform = config.get('platform');
    this.type = config.type
  }

  protected _getProxy(...rest) {
		const factory = new PlatformFactory(config)
		return factory.getAdapter(this.platform, this.type)
  }
}