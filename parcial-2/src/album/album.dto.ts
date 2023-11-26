import { IsNotEmpty, IsString, IsUrl, IsDate } from 'class-validator';

export class AlbumDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsUrl()
    readonly caratula: string;

    @IsNotEmpty()
    @IsDate()
    readonly fechaLanzamiento: Date;

    @IsString()
    readonly desc: string;


}
