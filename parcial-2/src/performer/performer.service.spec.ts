import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity';

describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a performer', async () => {
    const performer: PerformerEntity = new PerformerEntity;
    performer.nombre = faker.person.firstName();
    performer.imagen = faker.image.url();
    performer.desc = faker.lorem.words(99);
    performer.albums = [];

    const newPerformer = await repository.save(performer);

    expect(newPerformer.nombre).toEqual(performer.nombre);
    expect(newPerformer.imagen).toEqual(performer.imagen);
    expect(newPerformer.desc).toEqual(performer.desc);
    expect(newPerformer.albums.length).toEqual(0)
  });
});
