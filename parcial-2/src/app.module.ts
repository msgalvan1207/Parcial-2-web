import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //Dentro de este import deben estar todos los modulos
  imports: [ ,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      //EN entities se deben importar todas las entidades que se creen
      entities: [],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
