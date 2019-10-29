import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { ProductModule } from './product/product.module'

const configFactory = {
  provide: 'configFactory',
  useFactory: (configService: ConfigService) => {
    const platform = configService.get('platform')
    const type = configService.type
    
    return {platform, type}
  },

  inject: [ConfigService],
}; 

@Global()
@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [configFactory],
  exports: [configFactory]
})
export class AppModule {}