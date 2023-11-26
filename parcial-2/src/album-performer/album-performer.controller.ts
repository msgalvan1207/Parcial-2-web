import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AlbumPerformerService } from './album-performer.service';

@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumPerformerController {
    constructor(private readonly service: AlbumPerformerService) {}

    @Post(':albumId/performer/:performerId')
    async addPerformerToAlbum(@Param('albumId') albumId:string, @Param('performerId') performerId:string)
    {
        return await this.service.addPerformerToAlbum(albumId, performerId)
    }
}
