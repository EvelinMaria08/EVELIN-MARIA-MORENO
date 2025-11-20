import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Repository } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

/**
 * Servicio para gestionar las operaciones de medicamentos
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Medicine, incluyendo la creación, lectura,
 * actualización y eliminación de medicamentos.
 * 
 * @export
 * @class MedicineService
 */
@Injectable()
export class MedicineService {
    /**
     * Constructor del servicio de medicamentos
     * 
     * @param {Repository<Medicine>} medicineRepository - Repositorio de TypeORM para la entidad Medicine
     */
    constructor(
        @InjectRepository(Medicine)
        private readonly medicineRepository: Repository<Medicine>,
    ) {}

    /**
     * Crea un nuevo medicamento en la base de datos
     * 
     * @param {CreateMedicineDto} medicineDto - Datos del medicamento a crear
     * @returns {Promise<Medicine>} El medicamento creado
     * 
     * @example
     * ```typescript
     * const newMedicine = await medicineService.create({
     *   name: "Ibuprofeno",
     *   type: "tablet",
     *   presentation: "400mg",
     *   stock: 50,
     *   price: "3000"
     * });
     * ```
     */
    create(medicineDto: CreateMedicineDto) {
        const medicine = this.medicineRepository.create(medicineDto);
        return this.medicineRepository.save(medicine);
    }

    /**
     * Obtiene todos los medicamentos registrados
     * 
     * @returns {Promise<Medicine[]>} Array con todos los medicamentos
     * 
     * @example
     * ```typescript
     * const medicines = await medicineService.findAll();
     * ```
     */
    findAll() {
        return this.medicineRepository.find();
    }

    /**
     * Busca un medicamento por su ID
     * 
     * @param {number} id - ID del medicamento a buscar
     * @returns {Promise<Medicine | null>} El medicamento encontrado o null si no existe
     * 
     * @example
     * ```typescript
     * const medicine = await medicineService.findOne(1);
     * ```
     */
    findOne(id: number) {
        return this.medicineRepository.findOne({where: {id}});
    }

    /**
     * Actualiza un medicamento existente
     * 
     * @param {number} id - ID del medicamento a actualizar
     * @param {UpdateMedicineDto} medicineDto - Datos actualizados del medicamento
     * @returns {Promise<Medicine>} El medicamento actualizado
     * 
     * @example
     * ```typescript
     * const updated = await medicineService.update(1, {
     *   stock: 75,
     *   price: "3500"
     * });
     * ```
     */
    async update(id: number, medicineDto: UpdateMedicineDto) {
        await this.medicineRepository.update(id, medicineDto);
        return this.findOne(id);
    }

    /**
     * Elimina un medicamento por su ID
     * 
     * @param {number} id - ID del medicamento a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await medicineService.remove(1);
     * ```
     */
    remove(id: number) {
        return this.medicineRepository.delete(id);
    }
}