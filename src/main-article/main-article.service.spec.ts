import { Test, TestingModule } from '@nestjs/testing';
import { MainArticleService } from './main-article.service';

describe('MainArticleService', () => {
  let service: MainArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainArticleService],
    }).compile();

    service = module.get<MainArticleService>(MainArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
