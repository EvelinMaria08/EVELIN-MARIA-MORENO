import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';

/**
 * Controlador para gestionar las operaciones REST de pacientes
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los pacientes del sistema médico. Maneja las peticiones HTTP y delega
 * la lógica de negocio al servicio PatientService.
 * 
 * @route /patient
 * @export
 * @class PatientController
 */
@Controller('patient')
export class PatientController {
  /**
   * Constructor del controlador de pacientes
   * 
   * @param {PatientService} patientService - Servicio que maneja la lógica de negocio de pacientes
   */
  constructor(private readonly patientService: PatientService) {}
  
  /**
   * Crea un nuevo paciente
   * 
   * @route POST /patient
   * @param {CreatePatientDto} patientDto - Datos del paciente a crear
   * @returns {Promise<Patient>} El paciente creado con sus datos personales
   * 
   * @example
   * POST http://localhost:3000/patient
   * Body:
   * ```json
   * {
   *   "personId": 1,
   *   "bloodType": "O+",
   *   "insurance": "contributive",
   *   "medicalHistory": "Hipertensión controlada, alergia a la penicilina"
   * }
   * ```
   */
  @Post()
  create(@Body() patientDto: CreatePatientDto) {
    return this.patientService.createPatient(patientDto);
  }

  /**
   * Obtiene todos los pacientes
   * 
   * @route GET /patient
   * @returns {Promise<Patient[]>} Lista de todos los pacientes con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/patient
   */
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  /**
   * Obtiene un paciente por su ID
   * 
   * @route GET /patient/:id
   * @param {number} id - ID del paciente a buscar
   * @returns {Promise<Patient>} El paciente encontrado con sus datos personales
   * 
   * @example
   * GET http://localhost:3000/patient/1
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(+id);
  }

  /**
   * Actualiza un paciente existente
   * 
   * @route PATCH /patient/:id
   * @param {number} id - ID del paciente a actualizar
   * @param {UpdatePatientDto} patientDto - Datos actualizados del paciente
   * @returns {Promise<Patient>} El paciente actualizado
   * 
   * @example
   * PATCH http://localhost:3000/patient/1
   * Body:
   * ```json
   * {
   *   "bloodType": "A+",
   *   "insurance": "subsidized",
   *   "medicalHistory": "Hipertensión controlada, diabetes tipo 2"
   * }
   * ```
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() patientDto: UpdatePatientDto) {
    return this.patientService.update(+id, patientDto);
  }

  /**
   * Elimina un paciente por su ID
   * 
   * @route DELETE /patient/:id
   * @param {number} id - ID del paciente a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/patient/1
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientService.remove(+id);
  }
}