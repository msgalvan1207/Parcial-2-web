import { IsNotEmpty, IsString, IsUrl, IsDate } from 'class-validator';

export class AlbumDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsUrl()
    @IsNotEmpty()
    readonly caratula: string;

    @IsNotEmpty()
    @IsDate()
    readonly fechaLanzamiento: Date;

}
