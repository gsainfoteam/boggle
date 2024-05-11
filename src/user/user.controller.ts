import { Body, Controller, Post } from '@nestjs/common';
import { PostUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({
    description: 'Request Body',
    type: PostUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'To Save User uuid',
    content: {
      'application/json': {
        examples: {
          uuid: {
            value: {
              fcmTokenId: 'fcmtoken',
              createdAt: '2024-05-11T18:02:38.257Z',
              lastCheckAt: '2024-05-11T18:02:38.257Z',
              successCount: 0,
              failCount: 0,
              errors: null,
              userUuid: '123e4567-e89b-12d3-a456-426614174000',
              serviceId: 1,
            },
          },
        },
      },
    },
  })
  @Post()
  async PostUser(@Body() dataDto: PostUserDto): Promise<any> {
    return await this.userService.postuser(dataDto);
  }
}
