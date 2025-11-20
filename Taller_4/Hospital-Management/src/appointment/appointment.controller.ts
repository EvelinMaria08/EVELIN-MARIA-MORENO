import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new appointment
  //http:localhost:3000/appointment
  //The JSON Body must be in the format of the CreateAppointmentDto
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

    // ─── GET ───────────────────────────────────────────────
    //Get all appointments
    //http:localhost:3000/appointment
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

   // ─── GET ───────────────────────────────────────────────
    //Get appointment by id
    //http:localhost:3000/appointment/1
    //The param id is the id of the appointment, is required
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appointmentService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
    //Update an appointment
    //http:localhost:3000/appointment/1
    //The param id is the id of the appointment, is required for update
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
    //Delete an appointment
    //http:localhost:3000/appointment/1
    //The param id is the id of the appointment, is required for delete
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appointmentService.remove(+id);
  }
}
