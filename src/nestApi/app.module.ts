import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { ProductModule } from './product/product.module'
import { CatalogModule } from './catalog/catalog.module'
import { CartModule } from './cart/cart.module'
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [ProductModule, CatalogModule, CartModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}