import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PostServiceDto } from './dto/app.dto';
import { FcmService } from './fcm/fcm.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly fcmService: FcmService,
    private prisma: PrismaService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Send the message "pong" when the server is active.',
    content: {
      'application/json': {
        examples: {
          pong: {
            value: 'pong',
          },
        },
      },
    },
  })
  @Get()
  getHello(): string {
    return 'pong';
  }

  @Post('/service')
  async PostService(@Body() dataDto: PostServiceDto): Promise<object> {
    const service = await this.prisma.service.create({
      data: {
        name: dataDto.name,
        privateKey: dataDto.private_key,
        projectName: dataDto.project_name,
        email: dataDto.email,
      },
    });
    return service;
  }
}
