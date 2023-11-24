import { TrackEntity } from "../track/track.entity";
import { PerformerEntity } from "../performer/performer.entity";
import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    fechaLanzamiento: string;

    @Column()
    desc: string;

    @OneToMany(()=>TrackEntity, track=>track.album)
    tracks: TrackEntity[];

    @ManyToMany(()=>PerformerEntity, performer=>performer.albums)
    performers: PerformerEntity[];
}
