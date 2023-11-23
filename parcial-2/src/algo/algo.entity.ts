import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";

@Entity()
export class AlgoEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    column: string;

    //@OneToOne, debe usar JoinColumn para decir cual relacion es el dueño

    //@OneToMany, @ManyToOne sirve igual

    //@ManyToMany, puede utilizar @JoinTable para decidir cual es relacion es el dueño

    //AlgoToAlgo(()=> algoOtro.entity, algoOtro => algoOtro.asociacion)
    //asociacion: algoOtro;
}
