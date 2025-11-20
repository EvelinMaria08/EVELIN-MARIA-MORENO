import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// VALIDADCIÓN DE DATOS DE PARAMETROS DE CONSULTA USANDO DTOs

export class GetCoffeeDto {
    @Type(() => String)
    @IsString()
    /*@Matches(/^[a-zA-Z\s]+$/, {
      message: 'El campo "type" solo puede contener letras',
    })*/
    @IsAlpha()
    @IsNotEmpty()
    type: string;

    @Type(() => Number)
    @IsInt()
    size: number;

    @Type(() => Date)
    @IsDate()
    date: Date;

    @Type(() => Number)
    @IsInt()
    price: number;

    @Type(() => Boolean)
    @IsBoolean()
    @IsOptional()
    isPromo: boolean;

    @IsOptional()
    @IsString()
    promoCode: string;
}
