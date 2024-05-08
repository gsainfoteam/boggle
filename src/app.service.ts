import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { FcmService } from './fcm/fcm.service';
import { PostUserDto } from './dto/app.dto';

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
}
