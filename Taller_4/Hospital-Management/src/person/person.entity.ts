import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patient/patient.entity';
import * as bcrypt from 'bcrypt';

/**
 * Enumeración de roles de usuario en el sistema
 * 
 * @description
 * Define los diferentes tipos de roles que puede tener una persona en el sistema.
 * 
 * @enum {string}
 * 
 * @property {string} Doctor - Rol de doctor/médico
 * @property {string} Patient - Rol de paciente
 * @property {string} Admin - Rol de administrador
 */
export enum Role{
    Doctor = 'doctor',
    Patient = 'paciente',
    Admin = 'admin'
}

/**
 * Entidad que representa una persona en el sistema
 * 
 * @description
 * Esta entidad almacena la información personal de usuarios del sistema,
 * incluyendo datos de identificación, contacto, credenciales de acceso
 * y su rol. Implementa hashing automático de contraseñas para seguridad.
 * 
 * @export
 * @class Person
 * 
 * @example
 * ```typescript
 * const person = new Person();
 * person.name = "Juan";
 * person.lastName = "Pérez";
 * person.document = "1234567890";
 * person.email = "juan.perez@example.com";
 * person.phone = "3001234567";
 * person.password = "securePassword123";
 * person.role = Role.Patient;
 * ```
 */
@Entity('person')
export class Person {
    /**
     * Clave primaria de la persona
     * 
     * @type {number}
     * @description Identificador único autogenerado para la persona
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Nombre de la persona
     * 
     * @type {string}
     * @description Nombre o nombres de la persona
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "Juan", "María Fernanda"
     */
    @Column(
    {length: 100}
    )
    name: string;

    /**
     * Apellido de la persona
     * 
     * @type {string}
     * @description Apellido o apellidos de la persona
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "Pérez", "García López"
     */
    @Column(
    {length:100}
    )
    lastName: string;

    /**
     * Documento de identidad de la persona
     * 
     * @type {string}
     * @description Número de documento de identidad, debe ser único
     * @unique
     * @required
     * 
     * @example "1234567890", "CC-1234567"
     */
    @Column(
    {unique: true}
    )
    document: string;

    /**
     * Fecha de nacimiento de la persona
     * 
     * @type {Date}
     * @description Fecha de nacimiento de la persona
     * @optional
     * 
     * @example new Date('1990-05-15')
     */
    @Column({
        type: 'date',
        nullable: true
    })
    birthDate: Date;

    /**
     * Teléfono de la persona
     * 
     * @type {string}
     * @description Número de teléfono de contacto, debe ser único
     * @unique
     * @required
     * 
     * @example "3001234567", "+573001234567"
     */
    @Column(
    {unique: true}
    )
    phone: string;

    /**
     * Correo electrónico de la persona
     * 
     * @type {string}
     * @description Dirección de correo electrónico, debe ser única
     * @unique
     * @required
     * 
     * @example "usuario@example.com"
     */
    @Column(
    {unique: true}
    )
    email: string;

    /**
     * Contraseña hasheada de la persona
     * 
     * @type {string}
     * @description Contraseña del usuario encriptada con bcrypt.
     * No se selecciona por defecto en las consultas por seguridad.
     * @required
     * @select false
     * 
     * @example "$2b$10$abcdefghijklmnopqrstuvwxyz123456"
     */
    @Column(
    {select: false}
    )
    password: string;

    /**
     * Hash automático de contraseña antes de insertar o actualizar
     * 
     * @description
     * Método que se ejecuta automáticamente antes de crear o actualizar un registro.
     * Hashea la contraseña si existe, no está vacía y es texto plano (no comienza con '$2b$').
     * Utiliza bcrypt con un costo de 10 rounds.
     * 
     * @returns {Promise<void>}
     * 
     * @example
     * ```typescript
     * // Se ejecuta automáticamente:
     * // Antes: person.password = "miPassword123"
     * // Después: person.password = "$2b$10$..."
     * ```
     */
    @BeforeInsert()
    @BeforeUpdate()
    async passwordHash(){
        // 1. Verifica si la contraseña existe.
        // 2. Verifica si la contraseña NO comienza con el prefijo de Bcrypt ('$2b$'), 
        //    lo que indica que es texto plano y necesita ser hasheado.
        if (this.password && this.password.length > 0 && !this.password.startsWith('$2b$')) {
            // Costo recomendado: 10
            this.password = await bcrypt.hash(this.password, 10); 
        }
    }

    /**
     * Rol de la persona en el sistema
     * 
     * @type {Role}
     * @description Define el tipo de usuario y sus permisos en el sistema
     * @required
     * 
     * @example Role.Doctor, Role.Patient, Role.Admin
     */
    @Column({
        type: 'enum',
        enum: Role
    })
    role: Role;

    /**
     * Doctor asociado con esta persona
     * 
     * @type {Doctor}
     * @description Relación uno a uno con la entidad Doctor.
     * Si la persona tiene rol de doctor, esta relación contendrá su información médica.
     * @see {@link Doctor}
     */
    @OneToOne(
    () => Doctor,
    (doctor) => doctor.person
    )    
    doctor: Doctor;

    /**
     * Paciente asociado con esta persona
     * 
     * @type {Patient}
     * @description Relación uno a uno con la entidad Patient.
     * Si la persona tiene rol de paciente, esta relación contendrá su información clínica.
     * @see {@link Patient}
     */
    @OneToOne(
    () => Patient,
    (patient) => patient.person
    )
    patient: Patient;

    /**
     * Compara una contraseña en texto plano con el hash almacenado
     * 
     * @description
     * Método esencial para el proceso de login JWT.
     * Compara la contraseña proporcionada (texto plano) con el hash almacenado
     * en la base de datos utilizando bcrypt.
     * 
     * @param {string} attempt - Contraseña en texto plano a verificar
     * @returns {Promise<boolean>} true si la contraseña coincide, false en caso contrario
     * 
     * @example
     * ```typescript
     * const isValid = await person.comparePassword("miPassword123");
     * if (isValid) {
     *   // Contraseña correcta, proceder con login
     * }
     * ```
     */
    async comparePassword(attempt: string): Promise<boolean> {
        // Este método es ESENCIAL para el login JWT.
        // Compara el texto plano (attempt) con el hash almacenado (this.password).
        return await bcrypt.compare(attempt, this.password); 
    }
}