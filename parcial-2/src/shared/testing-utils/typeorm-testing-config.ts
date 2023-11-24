import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumEntity } from "../../album/album.entity"
import { PerformerEntity } from "../../performer/performer.entity";
import { TrackEntity } from "../../track/track.entity";
//importar las entidades


export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type:'sqlite',
        database: ':memory:',
        dropSchema: true,
        //lista de entidades que se utilizan en las pruebas
        entities: [AlbumEntity, TrackEntity, PerformerEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    //again, poner en la lista todas las entidades
    TypeOrmModule.forFeature([AlbumEntity, TrackEntity, PerformerEntity])
]