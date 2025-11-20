import { Type } from "class-transformer";
import { IsInt, IsOptional, IsDateString , IsString, ValidateNested, IsArray, IsNumber } from "class-validator";
import { CreatePrescriptionDetailDto } from "../../prescription-detail/dto/create-prescription-detail.dto";


// Create Prescription DTO
export class CreatePrescriptionDto {

    @IsDateString()
    @IsOptional()
    date?: Date;

    @IsString()
    @IsOptional()
    observations: string;

    @IsInt()
    quantity: number;

    @IsInt()
    duration: number;

    @IsNumber()
    appointmentId: number;

    @IsNumber()
    medicineId: number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePrescriptionDetailDto)
    details: CreatePrescriptionDetailDto[];
    
}
