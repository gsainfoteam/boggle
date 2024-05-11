import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { FcmModule } from 'src/fcm/fcm.module';

@Module({
  imports: [FcmModule, ServiceModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
