import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  private readonly products: Product[] = [
    { name: 'Product1' },
    { name: 'Product2' }
  ]
  
  findAll() {
    return this.products
  }
  
}
