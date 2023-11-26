
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PerformerDto } from './performer.dto';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity';

@Controller('performer')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {
    constructor(private readonly service: PerformerService) {}

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
    async create(@Body() performer: PerformerDto)
    {
        const performerEntity: PerformerEntity = plainToInstance(PerformerEntity, performer)
        return await this.service.create(performerEntity)
    }
}
