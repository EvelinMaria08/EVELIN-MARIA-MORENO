import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

/**
 * Controlador para gestionar las operaciones REST de doctores
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los doctores del sistema médico. Maneja las peticiones HTTP y delega
 * la lógica de negocio al servicio DoctorService.
 * 
 * @route /doctor
 * @export
 * @class DoctorController
 */
@Controller('doctor')
export class DoctorController {
  /**
   * Constructor del controlador de doctores
   * 
   * @param {DoctorService} doctorService - Servicio que maneja la lógica de negocio de doctores
   */
  constructor(private readonly doctorService: DoctorService) {}

  /**
   * Crea un nuevo doctor
   * 
   * @route POST /doctor
   * @param {CreateDoctorDto} dto - Datos del doctor a crear
   * @returns {Promise<Doctor>} El doctor creado con sus relaciones
   * 
   * @example
   * POST http://localhost:3000/doctor
   * Body:
   * ```json
   * {
   *   "personaId": 1,
   *   "specialtyId": 2,
   *   "licenseNumber": "MP-123456"
   * }
   * ```
   */
  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }

  /**
   * Obtiene todos los doctores
   * 
   * @route GET /doctor
   * @returns {Promise<Doctor[]>} Lista de todos los doctores con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/doctor
   */
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  /**
   * Obtiene un doctor por su ID
   * 
   * @route GET /doctor/:id
   * @param {number} id - ID del doctor a buscar
   * @returns {Promise<Doctor>} El doctor encontrado con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/doctor/1
   */
  @Get(':id')
  findOne(@Param(('id')) id: number) {
    return this.doctorService.findOne(+id);
  }

  /**
   * Actualiza un doctor existente
   * 
   * @route PATCH /doctor/:id
   * @param {number} id - ID del doctor a actualizar
   * @param {UpdateDoctorDto} dto - Datos actualizados del doctor
   * @returns {Promise<Doctor>} El doctor actualizado con sus relaciones
   * 
   * @example
   * PATCH http://localhost:3000/doctor/1
   * Body:
   * ```json
   * {
   *   "specialtyId": 3,
   *   "licenseNumber": "MP-789012"
   * }
   * ```
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(+id, dto);
  }

  /**
   * Elimina un doctor por su ID
   * 
   * @route DELETE /doctor/:id
   * @param {number} id - ID del doctor a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/doctor/1
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.doctorService.remove(+id);
  }
}