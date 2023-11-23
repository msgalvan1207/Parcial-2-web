import { TypeOrmModule } from "@nestjs/typeorm";
import { AlgoEntity } from "../../algo/algo.entity";
//importar las entidades


export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type:'sqlite',
        database: ':memory:',
        dropSchema: true,
        //lista de entidades que se utilizan en las pruebas
        entities: [AlgoEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    //again, poner en la lista todas las entidades
    TypeOrmModule.forFeature([AlgoEntity])
]