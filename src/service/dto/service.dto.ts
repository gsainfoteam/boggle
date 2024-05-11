export class PostServiceDto {
  readonly name: string;

  readonly private_key: string;

  readonly project_name: string;

  readonly email: string;
}

export class PushMessageDto {
  readonly notification: Notification;

  readonly data?: Record<string, string>;

  readonly forwarding: string[];
}
