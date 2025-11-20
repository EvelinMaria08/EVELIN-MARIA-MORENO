import { PartialType } from "@nestjs/mapped-types";
import { CreatePrescriptionDetailDto } from "./create-prescription-detail.dto";
import { IsInt, IsNotEmpty, IsString } from "class-validator";


// Update Prescription Detail DTO
export class UpdatePrescriptionDetailsDto extends PartialType(CreatePrescriptionDetailDto) {


    @IsString()
    @IsNotEmpty()
    dose: string;

    @IsInt()
    @IsNotEmpty()
    duration: number;

    @IsString()
    @IsNotEmpty()
    instrucitons: string;       

}