import { Body, Controller, Get, Patch, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-speciality.dto';

/**
 * Controlador para gestionar las operaciones REST de especialidades médicas
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre las especialidades médicas. Maneja las peticiones HTTP y delega la lógica
 * de negocio al servicio SpecialtyService.
 * 
 * @route /specialty
 * @export
 * @class SpecialtyController
 */
@Controller('specialty')
export class SpecialtyController {
  /**
   * Constructor del controlador de especialidades
   * 
   * @param {SpecialtyService} specialtyService - Servicio que maneja la lógica de negocio de especialidades
   */
  constructor(private readonly specialtyService: SpecialtyService) {}

  /**
   * Crea una nueva especialidad médica
   * 
   * @route POST /specialty
   * @param {CreateSpecialtyDto} dto - Datos de la especialidad a crear
   * @returns {Promise<Specialty>} La especialidad creada
   * 
   * @example
   * POST http://localhost:3000/specialty
   * Body:
   * ```json
   * {
   *   "name": "Cardiología",
   *   "description": "Especialidad médica dedicada al estudio del corazón"
   * }
   * ```
   */
  @Post()
  create(@Body()dto: CreateSpecialtyDto) {
    return this.specialtyService.create(dto);
  }

  /**
   * Obtiene todas las especialidades médicas
   * 
   * @route GET /specialty
   * @returns {Promise<Specialty[]>} Lista de todas las especialidades con sus doctores asociados
   * 
   * @example
   * GET http://localhost:3000/specialty
   */
  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }

  /**
   * Obtiene una especialidad por su ID
   * 
   * @route GET /specialty/:id
   * @param {number} id - ID de la especialidad a buscar
   * @returns {Promise<Specialty>} La especialidad encontrada
   * 
   * @example
   * GET http://localhost:3000/specialty/1
   */
  @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.specialtyService.findOne(id);
    }

  /**
   * Actualiza una especialidad existente
   * 
   * @route PATCH /specialty/:id
   * @param {number} id - ID de la especialidad a actualizar
   * @param {UpdateSpecialtyDto} dto - Datos actualizados de la especialidad
   * @returns {Promise<Specialty>} La especialidad actualizada
   * 
   * @example
   * PATCH http://localhost:3000/specialty/1
   * Body:
   * ```json
   * {
   *   "name": "Cardiología Intervencionista",
   *   "description": "Especialidad avanzada del corazón con procedimientos invasivos"
   * }
   * ```
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(id, dto);
  }

  /**
   * Elimina una especialidad por su ID
   * 
   * @route DELETE /specialty/:id
   * @param {number} id - ID de la especialidad a eliminar
   * @returns {Promise<void>}
   * 
   * @example
   * DELETE http://localhost:3000/specialty/1
   */
  @Delete(':id')
  delete(@Body('id') id: number) {
    return this.specialtyService.delete(+id);
  }
}