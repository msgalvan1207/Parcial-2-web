import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
export class PerformerDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsUrl()
    @IsNotEmpty()
    readonly imagen: string;

    @IsString()
    @IsNotEmpty()
    readonly desc: string;
}
