import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person, Role } from './person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

/**
 * Servicio para gestionar las operaciones de personas
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Person, incluyendo la creación, lectura,
 * actualización y eliminación de personas, así como búsquedas
 * especializadas por email y rol. Gestiona el hashing automático
 * de contraseñas en operaciones de creación y actualización.
 * 
 * @export
 * @class PersonService
 */
@Injectable()
export class PersonService {
    /**
     * Constructor del servicio de personas
     * 
     * @param {Repository<Person>} personRepository - Repositorio de TypeORM para la entidad Person
     */
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>
    ) {}

    /**
     * Crea una nueva persona en la base de datos
     * 
     * @description
     * Crea una nueva persona con hashing automático de contraseña.
     * El método save() activa el hook @BeforeInsert que hashea la contraseña
     * antes de guardar el registro.
     * 
     * @param {CreatePersonDto} createPersonDto - Datos de la persona a crear
     * @returns {Promise<Person>} La persona creada con la contraseña hasheada
     * 
     * @example
     * ```typescript
     * const newPerson = await personService.create({
     *   name: "Juan",
     *   lastName: "Pérez",
     *   document: "1234567890",
     *   email: "juan@example.com",
     *   phone: "3001234567",
     *   password: "securePass123",
     *   role: Role.Patient
     * });
     * ```
     */
    async create(createPersonDto: CreatePersonDto): Promise<Person>{
        const newPerson = this.personRepository.create(createPersonDto);
        // El save permite que se active el @BeforeInsert antes de que un usuario se cree, activando el hashing
        return this.personRepository.save(newPerson);
    }

    /**
     * Busca una persona por su correo electrónico
     * 
     * @description
     * Encuentra una persona utilizando su email como criterio de búsqueda.
     * Permite opcionalmente incluir la contraseña en el resultado,
     * útil para procesos de autenticación.
     * 
     * @param {string} email - Correo electrónico de la persona a buscar
     * @param {boolean} [includePassword=false] - Si es true, incluye la contraseña hasheada en el resultado
     * @returns {Promise<Person | null>} La persona encontrada o null si no existe
     * 
     * @example
     * ```typescript
     * // Búsqueda sin contraseña
     * const person = await personService.findOneByEmail("juan@example.com");
     * 
     * // Búsqueda con contraseña (para login)
     * const personWithPass = await personService.findOneByEmail("juan@example.com", true);
     * ```
     */
    async findOneByEmail(email: string, includePassword = false): Promise<Person | null> {
        const findOptions = {
            where: { email },
            select: includePassword ? ['id', 'name', 'email', 'role', 'password'] : ['id', 'name', 'email', 'role'],
        } as any;
        
        return this.personRepository.findOne(findOptions);
    }

    /**
     * Obtiene todas las personas registradas
     * 
     * @returns {Promise<Person[]>} Array con todas las personas
     * 
     * @example
     * ```typescript
     * const allPersons = await personService.findAll();
     * ```
     */
    findAll() {
        return this.personRepository.find();
    }

    /**
     * Busca personas por su rol
     * 
     * @description
     * Filtra y retorna todas las personas que tienen un rol específico.
     * Útil para obtener listas de doctores, pacientes o administradores.
     * 
     * @param {Role} role - Rol a filtrar (Doctor, Patient o Admin)
     * @returns {Promise<Person[]>} Array de personas con el rol especificado
     * 
     * @example
     * ```typescript
     * const doctors = await personService.findByrole(Role.Doctor);
     * const patients = await personService.findByrole(Role.Patient);
     * ```
     */
    findByrole(role: Role) {
        return this.personRepository.find({ where: { role } });
    }

    /**
     * Busca una persona por su ID
     * 
     * @param {number} id - ID de la persona a buscar
     * @returns {Promise<Person | null>} La persona encontrada o null si no existe
     * 
     * @example
     * ```typescript
     * const person = await personService.findOne(1);
     * ```
     */
    findOne(id: number) {
        return this.personRepository.findOne({ where: { id } });
    }

    /**
     * Actualiza una persona existente
     * 
     * @description
     * Actualiza los datos de una persona. Si se actualiza la contraseña,
     * el hook @BeforeUpdate se encarga de hashearla automáticamente.
     * 
     * @param {number} id - ID de la persona a actualizar
     * @param {UpdatePersonDto} updatePersonDto - Datos actualizados de la persona
     * @returns {Promise<Person>} La persona actualizada
     * 
     * @example
     * ```typescript
     * const updated = await personService.update(1, {
     *   phone: "3009876543",
     *   email: "newemail@example.com"
     * });
     * ```
     */
    async update(id: number, updatePersonDto: UpdatePersonDto) {
        await this.personRepository.update(id, updatePersonDto);
        return this.personRepository.findOne({ where: { id } });
    }
    /**
     * Elimina una persona por su ID
     * 
     * @param {number} id - ID de la persona a eliminar
     * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
     * 
     * @example
     * ```typescript
     * await personService.remove(1);
     * ```
     */
    remove(id: number) {
    // Delete person by id
    async remove(id: number) {
        return this.personRepository.delete(id);
    }
}