import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity';

@Module({
  providers: [PerformerService],
  imports: [TypeOrmModule.forFeature([PerformerEntity])]
})
export class PerformerModule {}
