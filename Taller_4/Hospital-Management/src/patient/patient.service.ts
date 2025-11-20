import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { Person } from '../person/person.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

/**
 * Servicio para gestionar las operaciones de pacientes
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Patient, incluyendo la creación, lectura,
 * actualización y eliminación de pacientes, así como el manejo
 * de sus relaciones con Person.
 * 
 * @export
 * @class PatientService
 */
@Injectable()
export class PatientService {
    /**
     * Constructor del servicio de pacientes
     * 
     * @param {Repository<Patient>} patientRepository - Repositorio de TypeORM para la entidad Patient
     * @param {Repository<Person>} personRepository - Repositorio de TypeORM para la entidad Person
     */
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) {}

    /**
     * Crea un nuevo paciente en la base de datos
     * 
     * @description
     * Crea un paciente asociándolo con una persona existente.
     * Primero verifica que la persona exista en el sistema antes de crear el paciente.
     * 
     * @param {CreatePatientDto} Patientdto - Datos del paciente a crear
     * @returns {Promise<Patient>} El paciente creado con sus relaciones
     * @throws {Error} Si la persona con el ID proporcionado no existe
     * 
     * @example
     * ```typescript
     * const newPatient = await patientService.createPatient({
     *   personId: 1,
     *   bloodType: "O+",
     *   insurance: "contributive",
     *   medicalHistory: "Hipertensión controlada"
     * });
     * ```
     */
    async createPatient(Patientdto: CreatePatientDto) {
        // Busca la persona por id
        const person = await this.personRepository.findOneBy({id: Patientdto.personId});
        
        if (!person) {
            throw new Error('Person not found');
        }
        // Crea el paciente
        const patient = this.patientRepository.create({
            person,
            insurance: Patientdto.insurance,
            bloodType: Patientdto.bloodType,
            medicalHistory: Patientdto.medicalHistory
        });
        return this.patientRepository.save(patient);
    }   

    /**
     * Obtiene todos los pacientes registrados con sus datos personales
     * 
     * @returns {Promise<Patient[]>} Array con todos los pacientes incluyendo la relación con Person
     * 
     * @example
     * ```typescript
     * const patients = await patientService.findAll();
     * // Retorna pacientes con datos de person poblados
     * ```
     */
    findAll() {
        return this.patientRepository.find({relations: ['person']});
    }

    /**
     * Busca un paciente por su ID con sus datos personales
     * 
     * @param {number} id - ID del paciente a buscar
     * @returns {Promise<Patient | null>} El paciente encontrado con sus datos personales o null si no existe
     * 
     * @example
     * ```typescript
     * const patient = await patientService.findOne(1);
     * ```
     */
    findOne(id: number) {
        return this.patientRepository.findOne({where: {id}, relations: ['person']});
    }

    /**
     * Actualiza un paciente existente
     * 
     * @param {number} id - ID del paciente a actualizar
     * @param {UpdatePatientDto} Patientdto - Datos actualizados del paciente
     * @returns {Promise<Patient>} El paciente actualizado con sus relaciones
     * 
     * @example
     * ```typescript
     * const updated = await patientService.update(1, {
     *   bloodType: "A+",
     *   medicalHistory: "Hipertensión controlada, diabetes tipo 2"
     * });
     * ```
     */
    async update(id: number, Patientdto: UpdatePatientDto) {
        await this.patientRepository.update(id, Patientdto);
        return this.findOne(id);
    }

    /**
     * Elimina un paciente por su ID
     * 
     * @param {number} id - ID del paciente a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await patientService.remove(1);
     * ```
     */
    remove(id: number) {
        return this.patientRepository.delete(id);
    }

}