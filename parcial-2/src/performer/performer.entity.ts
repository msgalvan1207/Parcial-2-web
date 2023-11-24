import { AlbumEntity } from "../album/album.entity";
import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class PerformerEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    nombre:string;

    @Column()
    imagen: string;

    @Column()
    desc: string;

    @ManyToMany(()=>AlbumEntity, album=>album.performers)
    albums: AlbumEntity;

}
