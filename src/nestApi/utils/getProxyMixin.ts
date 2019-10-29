import { Inject } from '@nestjs/common'
import { Request } from 'express'
import config from 'config'
import PlatformFactory from '../../platform/factory'

export default class GetProxyMixin {
  readonly platform: string;
  readonly type: string

  constructor(@Inject('configFactory') platform: any) {
    this.platform = platform.platform;
    this.type = platform.type
  }

  _getProxy (req: Request) {
		const factory = new PlatformFactory(config, req)
		return factory.getAdapter(this.platform, this.type)
  };
}