import { Module, forwardRef } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { ConfigModule } from '../config/config.module'
import { AppModule } from '../app.module'

@Module({
  imports: [forwardRef(() => AppModule), ConfigModule.register({type: 'cart'})],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
