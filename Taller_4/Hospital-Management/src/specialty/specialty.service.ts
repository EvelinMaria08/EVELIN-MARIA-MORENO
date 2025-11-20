import { InjectRepository } from "@nestjs/typeorm";
import { Specialty } from "./specialty.entity";
import { Repository } from "typeorm";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { UpdateSpecialtyDto } from "./dto/update-speciality.dto";

/**
 * Servicio para gestionar las operaciones de especialidades médicas
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Specialty, incluyendo la creación, lectura,
 * actualización y eliminación de especialidades médicas, así como
 * el manejo de sus relaciones con doctores.
 * 
 * @export
 * @class SpecialtyService
 */
export class SpecialtyService {
    /**
     * Constructor del servicio de especialidades
     * 
     * @param {Repository<Specialty>} specialtyRepository - Repositorio de TypeORM para la entidad Specialty
     */
    constructor(
        @InjectRepository(Specialty)
        private readonly specialtyRepository: Repository<Specialty>,
    ) {}

    /**
     * Crea una nueva especialidad en la base de datos
     * 
     * @param {CreateSpecialtyDto} dtospecialty - Datos de la especialidad a crear
     * @returns {Promise<Specialty>} La especialidad creada
     * 
     * @example
     * ```typescript
     * const newSpecialty = await specialtyService.create({
     *   name: "Cardiología",
     *   description: "Especialidad del corazón"
     * });
     * ```
     */
    async create(dtospecialty: CreateSpecialtyDto){
        const specialty = this.specialtyRepository.create(dtospecialty);
        return  this.specialtyRepository.save(specialty);
    }

    /**
     * Obtiene todas las especialidades registradas con sus doctores
     * 
     * @returns {Promise<Specialty[]>} Array con todas las especialidades incluyendo la relación con doctores
     * 
     * @example
     * ```typescript
     * const specialties = await specialtyService.findAll();
     * // Retorna especialidades con propety_doctor poblado
     * ```
     */
    findAll(){
        return this.specialtyRepository.find({relations: ['propety_doctor']});
    }

    /**
     * Busca una especialidad por su ID
     * 
     * @param {number} id - ID de la especialidad a buscar
     * @returns {Promise<Specialty>} La especialidad encontrada
     * @throws {Error} Si la especialidad no existe
     * 
     * @example
     * ```typescript
     * const specialty = await specialtyService.findOne(1);
     * ```
     */
    async findOne(id: number) {

        // Busca la especialidad
        const specialty = await this.specialtyRepository.findOne({
            where: { id_especialidad: id }
        });
        if (!specialty) throw new Error('Specialty not found');
        return specialty;
    }
    
    /**
     * Actualiza una especialidad existente
     * 
     * @param {number} id - ID de la especialidad a actualizar
     * @param {UpdateSpecialtyDto} dtospecialty - Datos actualizados de la especialidad
     * @returns {Promise<Specialty>} La especialidad actualizada
     * @throws {Error} Si la especialidad no existe
     * 
     * @example
     * ```typescript
     * const updated = await specialtyService.update(1, {
     *   name: "Cardiología Intervencionista",
     *   description: "Especialidad avanzada del corazón"
     * });
     * ```
     */
    async update(id: number, dtospecialty: UpdateSpecialtyDto){
        const specialty = await this.specialtyRepository.findOne({where: {id_especialidad: id}});
        if (!specialty) {
            throw new Error('Specialty not found');
        }
        specialty.name = dtospecialty.name;
        specialty.description = dtospecialty.description;
        return this.specialtyRepository.save(specialty);
    }

    /**
     * Elimina una especialidad por su ID
     * 
     * @param {number} id - ID de la especialidad a eliminar
     * @returns {Promise<void>}
     * @throws {Error} Si la especialidad no existe
     * 
     * @example
     * ```typescript
     * await specialtyService.delete(1);
     * ```
     */
    async delete(id: number){
        const specialty = await this.specialtyRepository.findOne({where: {id_especialidad: id}});
        if (!specialty) {
            throw new Error('Specialty not found');
        }
        await this.specialtyRepository.delete(specialty);
    }
}