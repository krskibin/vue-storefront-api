import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from '../app.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [forwardRef(() => AppModule), ConfigModule.register({type: 'order'})],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

