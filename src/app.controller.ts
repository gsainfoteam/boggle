import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PostServiceDto, PostUserDto, PushMessageDto } from './dto/app.dto';
import { FcmService } from './fcm/fcm.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { NotFoundError } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly fcmService: FcmService,
    private prisma: PrismaService,
    private appService: AppService,
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

  @Post('/user')
  async PostUser(@Body() dataDto: PostUserDto): Promise<any> {
    return await this.appService.postuser(dataDto);
  }

  @Post('/service/:id/push')
  async PushMessages(
    @Param('id') id: number, // Serivce ID
    @Body() dataDto: PushMessageDto,
  ): Promise<any> {
    return await this.appService.PushMessages(id, dataDto);
  }
}
