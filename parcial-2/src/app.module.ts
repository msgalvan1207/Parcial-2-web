import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { PerformerModule } from './performer/performer.module';
import { AlbumPerformerModule } from './album-performer/album-performer.module';
import { AlbumEntity } from './album/album.entity';
import { TrackEntity } from './track/track.entity';
import { PerformerEntity } from './performer/performer.entity';

@Module({
  //Dentro de este import deben estar todos los modulos
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      //EN entities se deben importar todas las entidades que se creen
      entities: [AlbumEntity, TrackEntity, PerformerEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    AlbumModule,
    TrackModule,
    PerformerModule,
    AlbumPerformerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
