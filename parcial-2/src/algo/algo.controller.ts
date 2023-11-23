import { Body, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, Controller} from "@nestjs/common"
import { plainToInstance } from "class-transformer";
import { AlgoDto } from "./algo.dto";
import { AlgoEntity } from "./algo.entity";
import { AlgoService } from './algo.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('algo')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlgoController {
    constructor(private readonly algoService: AlgoService) {}

    //para utilizar el de asociaciones, exportar el servicio de asociaciones

    // funciones
    // @('id')
    // @Param('id') algoId: string
    // @Body() algoDto: AlgoDto
    // cuando se llama a algo const algo: AlgoEntity = plainToInstance(AlgoEntity, algoDto)

    //para el delete, incluir @HttpCode(204)
}
