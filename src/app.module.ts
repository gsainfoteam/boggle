import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ServiceModule } from './service/service.module';
import { UserModule } from './user/user.module';
import { FcmModule } from './fcm/fcm.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FcmModule,
    ServiceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
