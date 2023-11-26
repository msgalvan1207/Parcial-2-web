import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';
import { AlbumEntity } from './album.entity';
import { TrackEntity } from '../track/track.entity';


describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albums: AlbumEntity[] = [];

  let track: TrackEntity = new TrackEntity;
  let trackRepository: Repository<TrackEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity))
    trackRepository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity))
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear()
    albums = []

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
    expect(albumsList.length).toEqual(albums.length);
  });

  it("should return one album", async () => {
    const album: AlbumEntity = await service.findOne(albums[0].id);
    expect(album).toBeDefined();
    expect(album.id).toEqual(albums[0].id);
    expect(album.nombre).toEqual(albums[0].nombre);
    expect(album.fechaLanzamiento).toEqual(albums[0].fechaLanzamiento);
    expect(album.caratula).toEqual(albums[0].caratula);
    expect(album.desc).toEqual(albums[0].desc);
  });

  it("should throw an exception when album not found", async () => {
    await expect(() => service.findOne("1")).rejects.toHaveProperty('message', 'album not found or does not exist')
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
    album.nombre = faker.music.genre()
    album.fechaLanzamiento = new Date()
    album.caratula = faker.image.url()
    album.desc = ""

    await expect(()=>service.create(album)).rejects.toHaveProperty('message','album description must not be null or vacio')
  });

  it('should throw an exception when name is vacio', async () => {
    const album: AlbumEntity = new AlbumEntity;
    album.nombre = ""
    album.fechaLanzamiento = new Date()
    album.caratula = faker.image.url()
    album.desc = faker.lorem.words(99)

    await expect(()=>service.create(album)).rejects.toHaveProperty('message','album name must not be null or vacio')
  });

  it('should delete an album', async () => {
    const album: AlbumEntity = await service.delete(albums[0].id)
    expect(album).toBeDefined()
    expect(album.nombre).toEqual(albums[0].nombre)
    expect(album.fechaLanzamiento).toEqual(albums[0].fechaLanzamiento)
    expect(album.caratula).toEqual(albums[0].caratula)
    expect(album.desc).toEqual(albums[0].desc)

    expect(await repository.findOne({where:{id:albums[0].id}})).toBeNull()

  });

  it('should throw an exception when album is not found', async () => {
    await expect(()=>service.delete("1")).rejects.toHaveProperty('message','album not found or does not exist')
  });

  it('should throw an exception when album has tracks', async () => {
    await trackRepository.save({
      nombre: faker.music.genre(),
      duracion: faker.number.int(),
      album: albums[0]
    })

    await expect(()=>service.delete(albums[0].id)).rejects.toHaveProperty('message','album cant be deleted because it has tracks')
  });


});
