import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';
import { AlbumEntity } from './album.entity';


describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity))
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear()
    const albums = []

    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        nombre: faker.music.genre(),
        fechaLanzamiento: faker.date.past(),
        caratula: faker.image.url(),
        desc: faker.lorem.words(99),
        tracks: [],
        performers: []
      })
      albums.push(album)
    };

  };


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return all albums", async () => {
    const albumsList: AlbumEntity[] = await service.findAll();
    console.log(albumsList)
  });

  it('should create an album', async () =>{
    const album: AlbumEntity = new AlbumEntity;
    album.nombre = "algo"
    album.fechaLanzamiento = new Date()
    album.caratula = "algo"
    album.desc = "algo"
    
    const newAlbum = await service.create(album)

    expect(newAlbum.nombre).toEqual(album.nombre)
    expect(newAlbum.fechaLanzamiento).toEqual(album.fechaLanzamiento)
    expect(newAlbum.caratula).toEqual(album.caratula)
    expect(newAlbum.desc).toEqual(album.desc)
  });

  it('should throw an exception when description is vacio', async () => {
    const album: AlbumEntity = new AlbumEntity;
    album.nombre = "algo"
    album.fechaLanzamiento = new Date()
    album.caratula = "algo"
    album.desc = ""

    await expect(()=>service.create(album)).rejects.toHaveProperty('message','album description must not be null or vacio')
  });

});
