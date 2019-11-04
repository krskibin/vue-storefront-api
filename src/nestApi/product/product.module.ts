import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AppModule } from '../app.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [forwardRef(() => AppModule), ConfigModule.register({type: 'product'})],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
