import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>
    ) {}

    async findAll(): Promise<TrackEntity[]>
    {
        return await this.trackRepository.find({relations:['album']})
    }

    async findOne(id:string) : Promise<TrackEntity>
    {
        const track: TrackEntity = await this.trackRepository.findOne({where:{id}, relations:['album']})
        if (!track)
        {
            throw new BusinessLogicException('track was not found or doesnt exist', BusinessError.NOT_FOUND)
        }
        return track
    }

    async create(albumId:string, track:TrackEntity): Promise<TrackEntity>
    {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id:albumId}, relations:['performers','tracks']})
        if(!album)
        {
            throw new BusinessLogicException("album not found or does not exist", BusinessError.NOT_FOUND )
        }

        if(!track.duracion || track.duracion <0)
        {
            throw new BusinessLogicException("track duration must be a positive number", BusinessError.PRECONDITION_FAILED)
        }

        track.album = album

        const newTrack : TrackEntity = await this.trackRepository.save(track)

        album.tracks.push(newTrack)

        await this.albumRepository.save(album)
        
        return newTrack
    }
}
