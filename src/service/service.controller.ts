import { Body, Controller, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostServiceDto, PushMessageDto } from './dto/service.dto';
import { ServiceService } from './service.service';
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(
    private prisma: PrismaService,
    private serviceService: ServiceService,
  ) {}

  @ApiBody({
    description: 'Request Body',
    type: PostServiceDto,
  })
  @ApiResponse({
    status: 200,
    description: 'To Save Service Infomation',
    content: {
      'application/json': {
        examples: {
          name: {
            value: 'name',
          },
          private_key: {
            value: 'ASDWA223_asD',
          },
          project_name: {
            value: 'projectname',
          },
          email: {
            value: 'example@email.com',
          },
        },
      },
    },
  })
  @Post('/')
  async PostService(@Body() dataDto: PostServiceDto): Promise<any> {
    const find = await this.prisma.service.findMany({
      where: {
        privateKey: dataDto.private_key,
        projectName: dataDto.project_name,
        email: dataDto.email,
      },
    });
    if (!find || !find.length) {
      const service = await this.prisma.service.create({
        data: {
          name: dataDto.name,
          privateKey: dataDto.private_key,
          projectName: dataDto.project_name,
          email: dataDto.email,
        },
      });
      return service;
    } else {
      return 'ALREAY EXIST';
    }
  }

  @ApiBody({
    description: 'Request Body',
    type: PushMessageDto,
  })
  @ApiResponse({
    status: 200,
    description: 'To Publish Message Via FCM',
  })
  @Post('/:id/push')
  async PushMessages(
    @Param('id') id: number, // Serivce ID
    @Body() dataDto: PushMessageDto,
  ): Promise<any> {
    return await this.serviceService.PushMessages(id, dataDto);
  }
}
