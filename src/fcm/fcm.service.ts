import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { App } from 'firebase-admin/app';
import { Notification, getMessaging } from 'firebase-admin/messaging';
import { FcmRepository } from './fcm.repository';

@Injectable()
export class FcmService {
  constructor(private readonly fcmRepository: FcmRepository) {}

  async postMessage(
    app: App,
    notification: Notification,
    service: Service,
    tokens: string[],
    data?: Record<string, string>,
  ): Promise<void> {
    const result = await getMessaging(app).sendEachForMulticast({
      tokens,
      notification,
      apns: { payload: { aps: { mutableContent: true } } },
      data,
    });
    const responses = result.responses.map((res, idx) => ({
      res,
      token: tokens[idx],
    }));
    const sucessed = responses.filter(({ res }) => res.success);
    const failed = responses.filter(({ res }) => !res.success);

    await this.fcmRepository.updateFcmtokensSuccess(
      sucessed.map(({ token }) => token),
    );
    await this.fcmRepository.updateFcmtokensFail(
      failed.map(({ token }) => token),
    );

    await this.fcmRepository.createLogs(
      { notification, data },
      sucessed.map(({ token }) => token),
    );
  }
}
