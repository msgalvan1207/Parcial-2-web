import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';

@Injectable()
export class AlbumPerformerService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ){}

    async addPerformerToAlbum(albumId:string, performerId:string): Promise<AlbumEntity>
    {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id:albumId}, relations:['tracks','performers']})
        if (!album)
        {
            throw new BusinessLogicException("album not found or does not exist", BusinessError.NOT_FOUND)
        }
        if (album.performers.length >= 3)
        {
            throw new BusinessLogicException('album can only have 3 performers', BusinessError.PRECONDITION_FAILED)
        }

        const performer: PerformerEntity = await this.performerRepository.findOne({where:{id:performerId},relations:['albums']})
        if(!performer)
        {
            throw new BusinessLogicException('performer not found or does not exist', BusinessError.NOT_FOUND)
        }

        album.performers.push(performer)

        performer.albums.push(album)

        await this.performerRepository.save(performer)
        return await this.albumRepository.save(album)
    }
}
