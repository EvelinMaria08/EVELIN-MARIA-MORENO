import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionDto } from './create-prescription.dto';
import  { IsInt, IsString } from "class-validator";

// Update Prescription DTO
export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {
    
    @IsString()
    observations: string;

    @IsInt()
    quantity: number;

    @IsInt()
    duration: number;

    @IsInt()
    appointmentId: number;


}
