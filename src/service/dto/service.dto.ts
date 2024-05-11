import { ApiProperty } from '@nestjs/swagger';

export class PostServiceDto {
  @ApiProperty({
    description: 'name',
    default: 'name',
  })
  readonly name: string;

  @ApiProperty({
    description: 'pricate key',
    default: 'ASDWA223_asD',
  })
  readonly private_key: string;

  @ApiProperty({
    description: 'project_name',
    default: 'projectname',
  })
  readonly project_name: string;

  @ApiProperty({
    description: 'email',
    default: 'example@email.com',
  })
  readonly email: string;
}

export class PushMessageDto {
  readonly notification: Notification;

  @ApiProperty({
    description: 'data',
    default: 'I dont know yet..',
  })
  readonly data?: Record<string, string>;

  @ApiProperty({
    description: 'forwarding',
    default: 'I dont know yet..',
  })
  readonly forwarding: string[];
}
