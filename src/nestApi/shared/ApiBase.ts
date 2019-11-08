import { Inject } from '@nestjs/common'
import { ConfigService } from '../config/config.service';
import PlatformFactory from '../shared/PlatformFactory'
import config from 'config'

export default class ApiBaseService {
  readonly platform: string
  readonly type: string

  constructor(@Inject('ConfigService') config: ConfigService) {
    this.platform = config.get('platform');
    this.type = config.type
  }

  protected _getProxy(...rest: any) {
		const factory = new PlatformFactory(config)
		return factory.getAdapter(this.platform, this.type)
  }
}