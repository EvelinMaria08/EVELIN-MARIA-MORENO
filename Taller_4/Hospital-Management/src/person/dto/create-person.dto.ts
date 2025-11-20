import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../person.entity";
import { Type } from "class-transformer";

/**
 * DTO para la creación de una nueva persona
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear una persona en el sistema.
 * Utiliza class-validator para garantizar la integridad de los datos, incluyendo
 * validaciones específicas para contraseñas y roles.
 * 
 * @export
 * @class CreatePersonDto
 * 
 * @example
 * ```typescript
 * const newPerson: CreatePersonDto = {
 *   name: "Juan",
 *   lastname: "Pérez",
 *   document: "1234567890",
 *   birthDate: new Date("1990-05-15"),
 *   phone: "3001234567",
 *   email: "juan@example.com",
 *   password: "securePass123",
 *   role: Role.Patient,
 *   gender: "Masculino"
 * };
 * ```
 */
export class CreatePersonDto {

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
    @IsString()
    @Length(2, 100)
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
    @IsString()
    @Length(2, 100)
    lastname: string;

    /**
     * Documento de identidad de la persona
     * 
     * @type {string}
     * @description Número de documento de identidad único
     * @required
     * 
     * @example "1234567890", "CC-1234567"
     */
    @IsString()
    document: string;

    /**
     * Fecha de nacimiento de la persona
     * 
     * @type {Date}
     * @description Fecha de nacimiento en formato ISO 8601
     * @required
     * 
     * @example new Date("1990-05-15"), "1990-05-15"
     */
    @Type(() => Date)
    @IsDateString()
    birthDate: Date;

    /**
     * Teléfono de contacto de la persona
     * 
     * @type {string}
     * @description Número de teléfono móvil o fijo
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "3001234567", "+573001234567"
     */
    @IsString()
    @Length(2, 100)
    phone: string;

    /**
     * Correo electrónico de la persona
     * 
     * @type {string}
     * @description Dirección de correo electrónico válida
     * @required
     * 
     * @example "usuario@example.com"
     */
    @IsEmail()
    email: string;

    /**
     * Contraseña de la persona
     * 
     * @type {string}
     * @description Contraseña para acceso al sistema. Será hasheada automáticamente antes de guardar.
     * @minLength 8
     * @maxLength 50
     * @required
     * 
     * @example "securePass123", "MyP@ssw0rd!"
     */
    @IsString({ message: 'La contraseña debe tener caracteres válidos' })
    @Length(8, 50, {
        message: 'La contraseña debe tener entre 8 y 50 caracteres'
    })
    password: string;

    /**
     * Rol de la persona en el sistema
     * 
     * @type {Role}
     * @description Define el tipo de usuario y sus permisos (doctor, paciente, admin)
     * @required
     * 
     * @example Role.Doctor, Role.Patient, Role.Admin
     */
    @IsEnum(Role, { message: 'El rol debe ser existente' })
    role: Role;

    /**
     * Género de la persona
     * 
     * @type {string}
     * @description Género con el que se identifica la persona
     * @optional
     * 
     * @example "Masculino", "Femenino", "No binario", "Prefiero no decir"
     */
    @IsString()
    @IsOptional()
    gender: string;

}