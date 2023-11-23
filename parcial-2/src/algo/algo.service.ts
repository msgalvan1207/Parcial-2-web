import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from "typeorm";
import { AlgoEntity } from './algo.entity';

@Injectable()
export class AlgoService {
    constructor(
        @InjectRepository(AlgoEntity)
        private readonly algoRepository: Repository<AlgoEntity>
    ) {}

    //Funciones a utilizar: findAll(), findOne(id), create(Entity), update(id, Entity), delete(id)

    async funcion(): Promise<AlgoEntity> {
        //trolleo
        return new AlgoEntity()
    }
}
