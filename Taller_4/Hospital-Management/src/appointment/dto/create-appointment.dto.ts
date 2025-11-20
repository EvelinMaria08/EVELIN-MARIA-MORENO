import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";



export class CreateAppointmentDto {

    //Date of the appointment
    @IsDateString()
    date: Date;

    //Reason of the appointment
    //If the appointment is not scheduled, the reason is optional
    @IsString()
    @IsOptional()
    reason?: string;

    //Notes of the appointment
    //If the appointment is not scheduled, the notes is optional
    @IsString()
    @IsOptional()
    notes?: string;

    //Status of the appointment
    //If the appointment is not scheduled, the status is optional
    //Status: scheduled, completed, canceled
    @IsString()
    @IsOptional()
    status?: string;

    //Doctor id
    @IsInt()
    doctorId: number;

    //Patient id
    @IsInt()
    patientId: number;
    
    //Office id
    @IsInt()
    officeId: number;
    
}
