import { IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdateCashRegisterDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]+$/g, {
        message: 'El campo "id" debe puede contener letras y números',
    })
    id: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod: string;  
}