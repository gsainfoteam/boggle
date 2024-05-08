import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { FcmService } from './fcm/fcm.service';
import { PostUserDto, PushMessageDto } from './dto/app.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly fcmService: FcmService,
    private prisma: PrismaService,
  ) {}

  async postuser(dataDto: PostUserDto): Promise<any> {
    const find = await this.prisma.user.findUnique({
      where: {
        uuid: dataDto.uuid,
      },
    });

    if (!find) {
      const user = await this.prisma.user.create({
        data: {
          uuid: dataDto.uuid,
        },
      });
    }

    const find_svc = await this.prisma.service.findFirst({
      where: {
        name: dataDto.service_name,
      },
    });

    if (find_svc) {
      try {
        const fcmToken = await this.prisma.fcmToken.create({
          data: {
            fcmTokenId: dataDto.fcmtoken,
            userUuid: dataDto.uuid,
            serviceId: find_svc.id,
          },
        });
        return fcmToken;
      } catch (err) {
        return 'ALREADY CREATED';
      }
    } else {
      throw new NotFoundException(
        `CAN NOT FIND SERVICE NAME : ${dataDto.service_name}`,
      );
    }
  }

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
