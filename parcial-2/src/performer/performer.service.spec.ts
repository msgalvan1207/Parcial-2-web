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
  let performers: PerformerEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear()
    performers = []
    for (let i=0; i<5; i++) {
      const performer: PerformerEntity = await repository.save({
        nombre: faker.person.firstName(),
        imagen: faker.image.url(),
        desc: faker.lorem.words(99),
        albums: []
      })
      performers.push(performer)
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return all performers", async () => {
    const performersList: PerformerEntity[] = await service.findAll();
    expect(performersList.length).toEqual(performers.length);
  });

  it("should return one performer", async () => {
    const performer: PerformerEntity = await service.findOne(performers[0].id);
    expect(performer.nombre).toEqual(performers[0].nombre);
    expect(performer.imagen).toEqual(performers[0].imagen);
    expect(performer.desc).toEqual(performers[0].desc);
    expect(performer.albums.length).toEqual(0);
  });

  it('should throw an error when performer is not found', async () => {
    await expect(service.findOne('-1')).rejects.toHaveProperty('message', 'performer not found');
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

  it("should throw an error when performer description is too long", async () => {
    const performer: PerformerEntity = new PerformerEntity;
    performer.nombre = faker.person.firstName();
    performer.imagen = faker.image.url();
    performer.desc = faker.lorem.words(101);
    performer.albums = [];

    await expect(service.create(performer)).rejects.toHaveProperty('message', 'performer descriptio too long');
  });
  
});
