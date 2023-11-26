import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { AlbumPerformerService } from './album-performer.service';

describe('AlbumPerformerService', () => {
  let service: AlbumPerformerService;
  let albumRepository: Repository<AlbumEntity>;
  let performerRepository: Repository<PerformerEntity>;

  let album: AlbumEntity;
  let performers: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumPerformerService],
    }).compile();

    service = module.get<AlbumPerformerService>(AlbumPerformerService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    albumRepository.clear();
    performerRepository.clear();
    performers = [];
    album = await albumRepository.save({
      nombre: faker.music.genre(),
      fechaLanzamiento: faker.date.past(),
      caratula: faker.image.url(),
      desc: faker.lorem.words(99),
      tracks: [],
      performers: [],
    });

    for (let i=0; i<3; i++){
      const performer: PerformerEntity = await performerRepository.save({
        nombre: faker.person.firstName(),
        imagen: faker.image.url(),
        desc: faker.lorem.words(99),
        albums: [album],
      });
      performers.push(performer);
      album.performers.push(performer);
    };
    await albumRepository.save(album);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a performer to an album', async () => {
    const performer: PerformerEntity = await performerRepository.save({
      nombre: faker.person.firstName(),
      imagen: faker.image.url(),
      desc: faker.lorem.words(99),
      albums: [],
    });

    const album: AlbumEntity = await albumRepository.save({
      nombre: faker.music.genre(),
      fechaLanzamiento: faker.date.past(),
      caratula: faker.image.url(),
      desc: faker.lorem.words(99),
      tracks: [],
      performers: [],
    });

    await service.addPerformerToAlbum(album.id, performer.id);
    const albumWithPerformer: AlbumEntity = await albumRepository.findOne({where: {id: album.id}, relations: ['performers']});

    expect(albumWithPerformer.performers.length).toEqual(1);
    expect(albumWithPerformer.performers[0]).not.toBeNull();
    expect(albumWithPerformer.performers[0].id).toEqual(performer.id);
    expect(albumWithPerformer.performers[0].nombre).toEqual(performer.nombre);
    expect(albumWithPerformer.performers[0].imagen).toEqual(performer.imagen);
    expect(albumWithPerformer.performers[0].desc).toEqual(performer.desc);
  });

  it('should throw an exception when album not found', async () => {
    await expect(() => service.addPerformerToAlbum('1', performers[0].id)).rejects.toHaveProperty('message', 'album not found or does not exist');
  });

  it('should throw an exception when attempting to add more than 3 performers to an album', async () => {
    const performer: PerformerEntity = await performerRepository.save({
      nombre: faker.person.firstName(),
      imagen: faker.image.url(),
      desc: faker.lorem.words(99),
      albums: [],
    });

    await expect(() => service.addPerformerToAlbum(album.id, performer.id)).rejects.toHaveProperty('message', 'album can only have 3 performers');
  });

  it('should throw an exception when performer not found', async () => {

    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: faker.music.genre(),
      fechaLanzamiento: faker.date.past(),
      caratula: faker.image.url(),
      desc: faker.lorem.words(99),
      tracks: [],
      performers: [],
    });

    await expect(() => service.addPerformerToAlbum(newAlbum.id, '1')).rejects.toHaveProperty('message', 'performer not found or does not exist');
  });
  
});
