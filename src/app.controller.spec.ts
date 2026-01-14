import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('GET /hello', () => {
    it('should return "Hello World"', () => {
      expect(appController.getHelloWorld()).toBe('Hello World');
    });
  });

  describe('GET /hello/docker', () => {
    it('should return "Hello Docker"', () => {
      expect(appController.getHelloDocker()).toBe('Hello Docker');
    });
  });

  describe('GET /hello/cicd', () => {
    it('should return "Hello CI/CD"', () => {
      expect(appController.getHelloCicd()).toBe('Hello CI/CD');
    });
  });
});
