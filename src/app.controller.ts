import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Connect')
@Controller()
export class AppController {
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
}
