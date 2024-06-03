import { Test, TestingModule } from '@nestjs/testing';
import { NewArticleService } from './new-article.service';

describe('NewArticleService', () => {
  let service: NewArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewArticleService],
    }).compile();

    service = module.get<NewArticleService>(NewArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
