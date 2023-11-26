import { TrackEntity } from "../track/track.entity";
import { PerformerEntity } from "../performer/performer.entity";
import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm"

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    fechaLanzamiento: Date;

    @Column()
    desc: string;

    @OneToMany(()=>TrackEntity, track=>track.album)
    tracks: TrackEntity[];

    @ManyToMany(()=>PerformerEntity, performer=>performer.albums)
    @JoinTable()
    performers: PerformerEntity[];
}
