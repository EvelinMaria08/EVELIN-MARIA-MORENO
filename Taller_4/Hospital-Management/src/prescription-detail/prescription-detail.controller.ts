import { Body, Controller, Get, Inject, Patch, Post, Param, Delete } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescription-detail.dto';
import { PrescriptionDetailService } from './prescription-detail.service';
import { UpdatePrescriptionDetailsDto } from './dto/update-prescription-details.dto';


@Controller('prescription-detail')
export class PrescriptionDetailController {
    constructor(private readonly detailRepository: PrescriptionDetailService){}

    // ─── POST ───────────────────────────────────────────────
    //Create a new prescription detail
    //http:localhost:3000/prescription-detail
    // table relation between prescription and medicine, parameters id of prescription and medicine
    @Post()
    create(@Body() createPrescriptionDetailDto: CreatePrescriptionDetailDto) {
        return this.detailRepository.create(createPrescriptionDetailDto);
    }

    // ─── GET ───────────────────────────────────────────────
    //Get all prescription details
    //http:localhost:3000/prescription-detail
    @Get()
    findAll() {
        return this.detailRepository.findAll();
    }

    // ─── GET ───────────────────────────────────────────────
    //Get prescription detail by id
    //http:localhost:3000/prescription-detail/1
    //The param id is the id of the prescription detail, is required
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.detailRepository.findOne(id);
    }

    // ─── PATCH ───────────────────────────────────────────────
    // Update prescription detail by id
    // http:localhost:3000/prescription-detail/1
    // The param id is the id of the prescription detail, is required for update
    @Patch(':id')
    update(@Param('id') id: number, @Body() updatePrescriptionDetailsDto: UpdatePrescriptionDetailsDto) {
        return this.detailRepository.update(id, updatePrescriptionDetailsDto);
    }

    // ─── DELETE ───────────────────────────────────────────────
    // Delete prescription detail by id
    // http:localhost:3000/prescription-detail/1
    // The param id is the id of the prescription detail, is required for delete
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.detailRepository.remove(id);
    }

}


