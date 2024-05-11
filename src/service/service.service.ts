import { Injectable, NotFoundException } from '@nestjs/common';
import { FcmService } from 'src/fcm/fcm.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PushMessageDto } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(
    private readonly fcmService: FcmService,
    private prisma: PrismaService,
  ) {}

  async PushMessages(
    service_id: number,
    dataDto: PushMessageDto,
  ): Promise<any> {
    const find_service = await this.prisma.service.findUnique({
      where: {
        id: service_id,
      },
      select: {
        projectName: true,
        email: true,
        privateKey: true,
      },
    });

    let tokens: string[] = [];
    if (find_service) {
      try {
        // Condition : all user
        if (dataDto.forwarding.length == 1 && dataDto.forwarding[0] == '*') {
          const tokenObjs = await this.prisma.fcmToken.findMany({
            where: {
              serviceId: service_id,
            },
            select: {
              fcmTokenId: true,
            },
          });
          tokens = tokenObjs.map((token) => token.fcmTokenId);
        }
        // Contdition : Specific users
        else {
          const tokenObjs = await this.prisma.fcmToken.findMany({
            where: {
              serviceId: service_id,
              userUuid: {
                in: dataDto.forwarding,
              },
            },
          });
          tokens = tokenObjs.map((token) => token.fcmTokenId);
        }
        await this.fcmService.postMessage(
          dataDto.notification,
          find_service,
          tokens,
          dataDto.data,
        );

        return;
      } catch (e) {
        return e;
      }
    } else {
      throw new NotFoundException(`CANT NOT FIND SERVICE ID : ${service_id}`);
    }
  }
}
