import { Body, Controller, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostServiceDto, PushMessageDto } from './dto/service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(
    private prisma: PrismaService,
    private serviceService: ServiceService,
  ) {}
  @Post('/')
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

  @Post('/:id/push')
  async PushMessages(
    @Param('id') id: number, // Serivce ID
    @Body() dataDto: PushMessageDto,
  ): Promise<any> {
    return await this.serviceService.PushMessages(id, dataDto);
  }
}
