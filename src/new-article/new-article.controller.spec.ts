import { Test, TestingModule } from '@nestjs/testing';
import { NewArticleController } from './new-article.controller';
import { NewArticleService } from './new-article.service';

describe('NewArticleController', () => {
  let controller: NewArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewArticleController],
      providers: [NewArticleService],
    }).compile();

    controller = module.get<NewArticleController>(NewArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
