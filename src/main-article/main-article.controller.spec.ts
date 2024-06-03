import { Test, TestingModule } from '@nestjs/testing';
import { MainArticleController } from './main-article.controller';
import { MainArticleService } from './main-article.service';

describe('MainArticleController', () => {
  let controller: MainArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainArticleController],
      providers: [MainArticleService],
    }).compile();

    controller = module.get<MainArticleController>(MainArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
