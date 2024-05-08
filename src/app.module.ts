import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { FcmModule } from './fcm/fcm.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FcmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
