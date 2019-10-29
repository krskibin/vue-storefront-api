import { NestFactory } from '@nestjs/core'
import { NestApiModule} from './nestApi.module'

export default async function bootstrap() {
  const app = await NestFactory.create(NestApiModule)
  return app
}