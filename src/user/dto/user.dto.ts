import { ApiProperty } from '@nestjs/swagger';

export class PostUserDto {
  @ApiProperty({
    description: 'uuid',
    default: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly uuid: string;

  @ApiProperty({
    description: 'service_name',
    default: 'service_name',
  })
  readonly service_name: string;

  @ApiProperty({
    description: 'fcm token',
    default: 'fcm-token-value',
  })
  readonly fcmtoken: string;
}
