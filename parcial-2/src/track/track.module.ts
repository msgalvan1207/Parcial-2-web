import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from './track.entity';
import { TrackController } from './track.controller';


@Module({
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, TrackEntity])],
  controllers: [TrackController]
})
export class TrackModule {}
