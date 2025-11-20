import { IsInt, IsNotEmpty, IsString } from "class-validator";


// Create Prescription Detail DTO
export class CreatePrescriptionDetailDto {
    
    @IsInt()
    @IsNotEmpty()
    prescriptionId: number;
    
    @IsInt()
    @IsNotEmpty()
    medicineId: number;

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