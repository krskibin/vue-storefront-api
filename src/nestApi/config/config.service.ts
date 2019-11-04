import { Injectable, Inject } from '@nestjs/common';

import { ConfigOptions } from './interfaces';
import { CONFIG_OPTIONS } from './constants';
import config, { IConfig } from 'config';

@Injectable()
export class ConfigService {
  private readonly _config: IConfig;
  readonly type: string

  constructor(@Inject(CONFIG_OPTIONS) private options: ConfigOptions) {
    this._config = config
    this.type = options.type || ''
  }

  get(key: string): string {
    return this._config.get(key);
  }
}
