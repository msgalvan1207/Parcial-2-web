import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AlbumDto } from './album.dto';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';


@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
    constructor(private readonly service: AlbumService) {}

    @Get()
    async findAll()
    {
        return await this.service.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id:string)
    {
        return await this.service.findOne(id)
    }

    @Post()
    async create(@Body() album: AlbumDto)
    {
        const albumEntity: AlbumEntity = plainToInstance(AlbumEntity, album)
        return await this.service.create(albumEntity)
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id:string)
    {
        return await this.service.delete(id)
    }
}
