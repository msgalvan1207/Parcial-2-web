import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TrackDto } from './track.dto';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';

@Controller('track')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrackController {
    constructor(private readonly service: TrackService) {}

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

    @Post(':albumId')
    async create(@Param('albumId') albumId:string ,@Body() track: TrackDto)
    {
        const trackEntity: TrackEntity = plainToInstance(TrackEntity, track)
        return await this.service.create(albumId,trackEntity)
    }
}
