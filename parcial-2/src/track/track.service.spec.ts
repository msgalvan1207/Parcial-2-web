import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

describe('TrackService', () => {
  let service: TrackService;
  let trackRepository: Repository<TrackEntity>;
  let albumRepository: Repository<AlbumEntity>;

  let album: AlbumEntity;
  let tracks: TrackEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TrackService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    trackRepository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    trackRepository.clear();
    albumRepository.clear();
    
    album = await albumRepository.save({
      nombre: faker.music.genre(),
      fechaLanzamiento: faker.date.past(),
      caratula: faker.image.url(),
      desc: faker.lorem.words(99),
      tracks: [],
      performers: []
    });

    tracks = [];
    for (let i = 0; i < 5; i++) {
      const track: TrackEntity = await trackRepository.save({
        nombre: faker.music.genre(),
        duracion: faker.number.int(),
        album: album
      });
      tracks.push(track);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return all tracks", async () => {
    const tracksList: TrackEntity[] = await service.findAll();
    expect(tracksList.length).toEqual(tracks.length);
  });

  it("should return one track", async () => {
    const track: TrackEntity = await service.findOne(tracks[0].id);
    expect(track).toBeDefined();
    expect(track.id).toEqual(tracks[0].id);
    expect(track.duracion).toEqual(tracks[0].duracion);
    expect(track.nombre).toEqual(tracks[0].nombre);
  });

  it("should throw an exception when track does not exist", async () => {
    await expect(service.findOne("-1")).rejects.toHaveProperty('message', 'track was not found or doesnt exist')
  });

  it("should create a track", async () => {
    const track: TrackEntity = new TrackEntity();
    track.nombre = faker.music.songName();
    track.duracion = faker.number.int();

    const newTrack: TrackEntity = await service.create(album.id, track);

    expect(newTrack.nombre).toEqual(track.nombre);
    expect(newTrack.duracion).toEqual(track.duracion);
    expect(newTrack.album.id).toEqual(album.id);
  });

  it("should throw an exception when album does not exist", async () => {
    const track: TrackEntity = new TrackEntity();
    track.nombre = faker.music.songName();
    track.duracion = faker.number.int();

    await expect(service.create("-1", track)).rejects.toHaveProperty('message', 'album not found or does not exist')
  });

  it("should throw an exception when track duration is negative", async () => {
    const track: TrackEntity = new TrackEntity();
    track.nombre = faker.music.songName();
    track.duracion = -1;

    await expect(service.create(album.id, track)).rejects.toHaveProperty('message', 'track duration must be a positive number')
  });


});
