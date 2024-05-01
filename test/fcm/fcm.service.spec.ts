import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { FcmRepository } from 'src/fcm/fcm.repository';
import { FcmService } from 'src/fcm/fcm.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TestConfigModule } from 'test/config/testConfig.module';

describe('FcmService', () => {
  let fcmService: FcmService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TestConfigModule, ConfigModule, PrismaModule],
      providers: [FcmService, ConfigService, FcmRepository],
    }).compile();

    fcmService = module.get<FcmService>(FcmService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(fcmService).toBeDefined();
    expect(configService).toBeDefined();
    expect(configService.get('TEST_FCM_TOKEN')).toBeDefined();
    expect(configService.get('TEST_FCM_PROJECT_NAME')).toBeDefined();
    expect(configService.get('TEST_FCM_EMAIL')).toBeDefined();
    expect(configService.get('TEST_FCM_PRIVATE_KEY')).toBeDefined();
  });

  it('should post message', async () => {
    const notification = {
      title: 'test messages',
      body: 'test messages body',
    };
    const service = {
      projectName: configService.get('TEST_FCM_PROJECT_NAME'),
      email: configService.get('TEST_FCM_EMAIL'),
      privateKey: configService.get('TEST_FCM_PRIVATE_KEY'),
    };
    const tokens = [configService.get('TEST_FCM_TOKEN')];
    const data = {
      key: 'value',
    };
    expect(
      fcmService.postMessage(notification, service, tokens, data),
    ).resolves.not.toThrow();
  });
});
