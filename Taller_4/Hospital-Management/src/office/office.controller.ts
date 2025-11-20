import { Controller, Patch, Get, Post, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/Update-office.dto';

/**
 * Controlador para gestionar las operaciones REST de consultorios
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los consultorios. Maneja las peticiones HTTP y delega la lógica
 * de negocio al servicio OfficeService.
 * 
 * @route /office
 * @export
 * @class OfficeController
 */
@Controller('office')
export class OfficeController {
  /**
   * Constructor del controlador de consultorios
   * 
   * @param {OfficeService} officeService - Servicio que maneja la lógica de negocio de consultorios
   */
  constructor(private readonly officeService: OfficeService) {}

  /**
   * Crea un nuevo consultorio
   * 
   * @route POST /office
   * @param {CreateOfficeDto} dto - Datos del consultorio a crear
   * @returns {Promise<Office>} El consultorio creado
   * 
   * @example
   * POST http://localhost:3000/office
   * Body:
   * ```json
   * {
   *   "num_consultorio": 101,
   *   "piso": 1,
   *   "disponible": true
   * }
   * ```
   */
  @Post()
  create(@Body() dto: CreateOfficeDto) {
    return this.officeService.create(dto);
  }

  /**
   * Obtiene todos los consultorios
   * 
   * @route GET /office
   * @returns {Promise<Office[]>} Lista de todos los consultorios con sus citas asociadas
   * 
   * @example
   * GET http://localhost:3000/office
   */
  @Get()
  findAll() {
    return this.officeService.findAll();
  }

  /**
   * Obtiene un consultorio por su ID
   * 
   * @route GET /office/:id
   * @param {number} id - ID del consultorio a buscar
   * @returns {Promise<Office>} El consultorio encontrado con sus citas
   * 
   * @example
   * GET http://localhost:3000/office/1
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.findOne(id);
  }

  /**
   * Actualiza un consultorio existente
   * 
   * @route PATCH /office/:id
   * @param {number} id - ID del consultorio a actualizar
   * @param {UpdateOfficeDto} dto - Datos actualizados del consultorio
   * @returns {Promise<Office>} El consultorio actualizado
   * 
   * @example
   * PATCH http://localhost:3000/office/1
   * Body:
   * ```json
   * {
   *   "disponible": false,
   *   "piso": 2
   * }
   * ```
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOfficeDto,
  ) {
    return this.officeService.update(id, dto);
  }

  /**
   * Elimina un consultorio por su ID
   * 
   * @route DELETE /office/:id
   * @param {number} id - ID del consultorio a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/office/1
   */
  @Delete(':id')
  remove(@Body('id', ParseIntPipe) id: number) {
    return this.officeService.remove(id);
  }

}