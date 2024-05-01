import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { cert, initializeApp } from 'firebase-admin/app';
import { Notification, getMessaging } from 'firebase-admin/messaging';
import { FcmRepository } from './fcm.repository';

@Injectable()
export class FcmService {
  constructor(private readonly fcmRepository: FcmRepository) {}

  async postMessage(
    notification: Notification,
    service: Pick<Service, 'projectName' | 'email' | 'privateKey'>,
    tokens: string[],
    data?: Record<string, string>,
  ): Promise<void> {
    // Initialize Firebase Admin SDK
    const app = initializeApp({
      credential: cert({
        projectId: service.projectName,
        clientEmail: service.email,
        privateKey: service.privateKey,
      }),
    });

    // send message to each token
    const result = await getMessaging(app).sendEachForMulticast({
      tokens,
      notification,
      apns: { payload: { aps: { mutableContent: true } } },
      data,
    });

    // update success and fail count
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

    // create logs
    await this.fcmRepository.createLogs(
      { notification, data },
      sucessed.map(({ token }) => token),
    );
  }
}
