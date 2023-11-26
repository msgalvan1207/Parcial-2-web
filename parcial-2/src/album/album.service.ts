import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly repository: Repository<AlbumEntity>
    ) {}

    async findAll(): Promise<AlbumEntity[]>
    {
        return await this.repository.find({relations:['tracks','performers']})
    }

    async findOne(id:string): Promise<AlbumEntity>
    {
        const album: AlbumEntity = await this.repository.findOne({where:{id}, relations:['tracks','performers']})
        if(!album)
        {
            throw new BusinessLogicException("album not found or does not exist", BusinessError.NOT_FOUND )
        }
        return album
    }

    async create(album: AlbumEntity): Promise<AlbumEntity>
    {
        if (!album.nombre|| album.nombre==='')
        {
            throw new BusinessLogicException('album name must not be null or vacio', BusinessError.PRECONDITION_FAILED)
        }
        if (!album.desc || album.desc ==='')
        {
            throw new BusinessLogicException('album description must not be null or vacio', BusinessError.PRECONDITION_FAILED)
        }

        return await this.repository.save(album)
    }

    async delete(id:string) : Promise<AlbumEntity>
    {
        const album: AlbumEntity = await this.repository.findOne({where:{id}, relations:['tracks','performers']})
        if(!album)
        {
            throw new BusinessLogicException("album not found or does not exist", BusinessError.NOT_FOUND )
        }

        if(album.tracks.length!==0)
        {
            throw new BusinessLogicException('album cant be deleted because it has tracks', BusinessError.PRECONDITION_FAILED)
        }

        return await this.repository.remove(album)
    }
}
