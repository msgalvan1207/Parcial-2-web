import { Module } from '@nestjs/common';
import { AlgoService } from './algo.service';
import { AlgoEntity } from './algo.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AlgoController } from './algo.controller';

@Module({
  providers: [AlgoService],
  imports: [TypeOrmModule.forFeature([AlgoEntity])],
  controllers: [AlgoController]
})
export class AlgoModule {}
