import { IsDateString, IsInt, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {


    //Doctor id
    @IsInt()
    doctorId: number;

    //Patient id
    @IsInt()
    patientId: number;  
    
    //Office id
    @IsInt()
    officeId: number;
    
    //Status of the appointment
    //Status: scheduled, completed, canceled
    @IsString()
    status: string;

    //Date of the appointment
    @IsDateString()
    date: Date;

    //Reason of the appointment
    //If the appointment is not scheduled, the reason is optional
    @IsString()
    reason: string;

    //Notes of the appointment
    //If the appointment is not scheduled, the notes is optional
    @IsString()
    notes: string;
}
