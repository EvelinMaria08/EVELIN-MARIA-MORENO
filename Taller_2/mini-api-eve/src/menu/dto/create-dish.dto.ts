import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    MaxLength,
    IsOptional,
} from 'class-validator';

export class CreateDishDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    name: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1000)
    price: number;

    @IsOptional()
    @IsString()
    category?: string;
}
