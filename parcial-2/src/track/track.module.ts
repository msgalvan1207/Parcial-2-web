import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from './track.entity';


@Module({
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, TrackEntity])]
})
export class TrackModule {}
