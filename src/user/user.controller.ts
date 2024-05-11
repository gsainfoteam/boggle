import { Body, Controller, Post } from '@nestjs/common';
import { PostUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async PostUser(@Body() dataDto: PostUserDto): Promise<any> {
    return await this.userService.postuser(dataDto);
  }
}
