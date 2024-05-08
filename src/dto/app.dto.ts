export class PostServiceDto {
  readonly name: string;

  readonly private_key: string;

  readonly project_name: string;

  readonly email: string;
}

export class PostUserDto {
  readonly uuid: string;

  readonly service_name: string;

  readonly fcmtoken: string;
}
