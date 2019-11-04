import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { ProductModule } from './product/product.module'
import { CatalogModule } from './catalog/catalog.module'
import { CartModule } from './cart/cart.module'

@Global()
@Module({
  imports: [ProductModule, CatalogModule, CartModule],
  controllers: [AppController],
})
export class AppModule {}