import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  // ─── POST ───────────────────────────────────────────────
  //Create a new prescription
  //http:localhost:3000/prescription
  //The JSON Body must be in the format of the CreatePrescriptionDto
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  // ─── GET ───────────────────────────────────────────────
  //Get all prescriptions
  //http:localhost:3000/prescription
  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  // ─── GET ───────────────────────────────────────────────
  //Get prescription by id
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prescriptionService.findOne(+id);
  }

  // ─── PATCH ───────────────────────────────────────────────
  //Update an prescription
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required for update
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  // ─── DELETE ───────────────────────────────────────────────
  //Delete an prescription
  //http:localhost:3000/prescription/1
  //The param id is the id of the prescription, is required for delete
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prescriptionService.remove(+id);
  }
}
