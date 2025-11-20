import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineService } from './medicine.service';

/**
 * Controlador para gestionar las operaciones REST de medicamentos
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre los medicamentos. Maneja las peticiones HTTP y delega la lógica
 * de negocio al servicio MedicineService.
 * 
 * @route /medicine
 * @export
 * @class MedicineController
 */
@Controller('medicine')
export class MedicineController {
  /**
   * Constructor del controlador de medicamentos
   * 
   * @param {MedicineService} medicineService - Servicio que maneja la lógica de negocio de medicamentos
   */
  constructor(private readonly medicineService: MedicineService) {}

  /**
   * Crea un nuevo medicamento
   * 
   * @route POST /medicine
   * @param {CreateMedicineDto} createMedicineDto - Datos del medicamento a crear
   * @returns {Promise<Medicine>} El medicamento creado
   * 
   * @example
   * POST http://localhost:3000/medicine
   * Body:
   * ```json
   * {
   *   "name": "Paracetamol",
   *   "type": "tablet",
   *   "presentation": "500mg",
   *   "stock": 100,
   *   "price": "5000"
   * }
   * ```
   */
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  } 

  /**
   * Obtiene todos los medicamentos
   * 
   * @route GET /medicine
   * @returns {Promise<Medicine[]>} Lista de todos los medicamentos registrados
   * 
   * @example
   * GET http://localhost:3000/medicine
   */
  @Get()
  findAll() {
    return this.medicineService.findAll();
  }

  /**
   * Obtiene un medicamento por su ID
   * 
   * @route GET /medicine/:id
   * @param {string} id - ID del medicamento a buscar
   * @returns {Promise<Medicine>} El medicamento encontrado
   * 
   * @example
   * GET http://localhost:3000/medicine/1
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.medicineService.findOne(+id);
  }

  /**
   * Actualiza un medicamento existente
   * 
   * @route PATCH /medicine/:id
   * @param {string} id - ID del medicamento a actualizar
   * @param {UpdateMedicineDto} updateMedicineDto - Datos actualizados del medicamento
   * @returns {Promise<Medicine>} El medicamento actualizado
   * 
   * @example
   * PATCH http://localhost:3000/medicine/1
   * Body:
   * ```json
   * {
   *   "stock": 150,
   *   "price": "5500"
   * }
   * ```
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicineService.update(+id, updateMedicineDto);
  }

  /**
   * Elimina un medicamento por su ID
   * 
   * @route DELETE /medicine/:id
   * @param {string} id - ID del medicamento a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/medicine/1
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medicineService.remove(+id);
  }

}