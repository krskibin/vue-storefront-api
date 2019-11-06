import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppModule } from '../app.module';
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [forwardRef(() => AppModule), ConfigModule.register({type: 'user'})],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
