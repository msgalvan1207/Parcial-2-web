import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { PerformerEntity } from './performer.entity';

@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity)
        private readonly repository: Repository<PerformerEntity>
    ) {}

    async findAll(): Promise<PerformerEntity[]>
    {
        return await this.repository.find({relations:['albums']})
    }

    async findOne(id:string): Promise<PerformerEntity>
    {
        const perf: PerformerEntity = await this.repository.findOne({where:{id}, relations:['albums']})
        if (!perf)
        {
            throw new BusinessLogicException('performer not found', BusinessError.NOT_FOUND)
        }
        return perf
    }

    async create(perf: PerformerEntity): Promise<PerformerEntity>
    {
        if(perf.desc.length >= 100)
        {
            throw new BusinessLogicException('performer descriptio too long', BusinessError.PRECONDITION_FAILED)
        }

        return await this.repository.save(perf)
    }
}
