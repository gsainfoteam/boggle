import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FcmRepository } from './fcm.repository';

@Module({
  imports: [PrismaModule],
  providers: [FcmService, FcmRepository],
  exports: [FcmService],
})
export class FcmModule {}
