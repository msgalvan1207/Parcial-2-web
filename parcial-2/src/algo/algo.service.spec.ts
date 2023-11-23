import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlgoService } from './algo.service';
import { AlgoEntity } from './algo.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AlgoService', () => {
  let service: AlgoService;
  let repository: Repository<AlgoEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlgoService],
    }).compile();

    service = module.get<AlgoService>(AlgoService);
    repository = module.get<Repository<AlgoEntity>>(getRepositoryToken(AlgoEntity))
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear()
    // guardar entidades con repository.save({cosas de la entidad})
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Cada prueba se crea con un it('descripcion', () => {}) donde se revisan cosas con expect. y tomando funciones de service 
});
