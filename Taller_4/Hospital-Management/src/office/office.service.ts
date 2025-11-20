import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './office.entity';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/Update-office.dto';

/**
 * Servicio para gestionar las operaciones de consultorios
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Office, incluyendo la creación, lectura,
 * actualización y eliminación de consultorios, así como el manejo
 * de sus relaciones con citas.
 * 
 * @export
 * @class OfficeService
 */
@Injectable()
export class OfficeService {

    /**
     * Constructor del servicio de consultorios
     * 
     * @param {Repository<Office>} officeRepository - Repositorio de TypeORM para la entidad Office
     */
    constructor(
        @InjectRepository(Office)
        private readonly officeRepository: Repository<Office>,
    ) {}

    /**
     * Crea un nuevo consultorio en la base de datos
     * 
     * @param {CreateOfficeDto} createOfficeDto - Datos del consultorio a crear
     * @returns {Promise<Office>} El consultorio creado
     * 
     * @example
     * ```typescript
     * const newOffice = await officeService.create({
     *   num_consultorio: 101,
     *   piso: 1,
     *   disponible: true
     * });
     * ```
     */
    async create(createOfficeDto: CreateOfficeDto) {
        const office = this.officeRepository.create(createOfficeDto);
        return this.officeRepository.save(office);
    }

    /**
     * Obtiene todos los consultorios registrados con sus citas
     * 
     * @returns {Promise<Office[]>} Array con todos los consultorios incluyendo la relación con citas
     * 
     * @example
     * ```typescript
     * const offices = await officeService.findAll();
     * // Retorna consultorios con property_cita poblado
     * ```
     */
    findAll() {
        return this.officeRepository.find( {relations: ['property_cita']});
    }

    /**
     * Busca un consultorio por su ID incluyendo sus citas
     * 
     * @param {number} id - ID del consultorio a buscar
     * @returns {Promise<Office>} El consultorio encontrado con sus citas
     * @throws {Error} Si el consultorio no existe
     * 
     * @example
     * ```typescript
     * const office = await officeService.findOne(1);
     * ```
     */
    async findOne(id: number) {
        const office = await this.officeRepository.findOne({where: {id_consultorio: id}, relations: ['property_cita']});
        // Si el consultorio no existe
        if (!office) throw new Error('Office not found');
        return office;
    }

    /**
     * Actualiza un consultorio existente
     * 
     * @param {number} id - ID del consultorio a actualizar
     * @param {UpdateOfficeDto} updateOfficeDto - Datos actualizados del consultorio
     * @returns {Promise<Office>} El consultorio actualizado con sus relaciones
     * @throws {Error} Si el consultorio no existe
     * 
     * @description
     * Verifica la existencia del consultorio antes de actualizar.
     * Si se envía un nuevo num_consultorio, actualiza la relación correspondiente.
     * 
     * @example
     * ```typescript
     * const updated = await officeService.update(1, {
     *   disponible: false,
     *   piso: 2
     * });
     * ```
     */
    async update(id: number, updateOfficeDto: UpdateOfficeDto) {
        // Verificación de existencia del consultorio
        const office = await this.findOne(id);
        // Si se envía nuevo num_consultorio, actualiza la relación
        Object.assign(office, updateOfficeDto);
        return this.officeRepository.save(office);
    }   

    /**
     * Elimina un consultorio por su ID
     * 
     * @param {number} id - ID del consultorio a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await officeService.remove(1);
     * ```
     */
    remove(id: number) {
        return this.officeRepository.delete(id);
    }
}