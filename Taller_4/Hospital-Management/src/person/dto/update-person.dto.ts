import { IsDateString, IsEmail, IsOptional, IsString, Length } from "class-validator";
import { CreatePersonDto } from "./create-person.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "../person.entity";

/**
 * DTO para la actualización de una persona existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar una persona.
 * Extiende de CreatePersonDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdatePersonDto
 * @extends {PartialType(CreatePersonDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo email y teléfono
 * const updateData: UpdatePersonDto = {
 *   email: "nuevoemail@example.com",
 *   phone: "3009876543"
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdatePersonDto = {
 *   name: "Juan Carlos",
 *   lastname: "Pérez González",
 *   document: "1234567890",
 *   birthDate: new Date("1990-05-15"),
 *   email: "juan.perez@example.com",
 *   phone: "3001234567",
 *   role: Role.Doctor,
 *   gender: "Masculino"
 * };
 * ```
 */
export class UpdatePersonDto extends PartialType(CreatePersonDto) {

    /**
     * Nombre de la persona
     * 
     * @type {string}
     * @description Nombre o nombres de la persona
     * @minLength 2
     * @maxLength 100
     * @optional
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
     * @optional
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
     * @optional
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
     * @optional
     * 
     * @example new Date("1990-05-15"), "1990-05-15"
     */
    @IsDateString()
    birthDate: Date;

    /**
     * Correo electrónico de la persona
     * 
     * @type {string}
     * @description Dirección de correo electrónico válida
     * @optional
     * 
     * @example "usuario@example.com"
     */
    @IsEmail()
    email: string;

    /**
     * Teléfono de contacto de la persona
     * 
     * @type {string}
     * @description Número de teléfono móvil o fijo
     * @minLength 2
     * @maxLength 100
     * @optional
     * 
     * @example "3001234567", "+573001234567"
     */
    @IsString()
    @Length(2, 100)
    phone: string;

    /**
     * Rol de la persona en el sistema
     * 
     * @type {Role}
     * @description Define el tipo de usuario y sus permisos (doctor, paciente, admin)
     * @optional
     * 
     * @example Role.Doctor, Role.Patient, Role.Admin
     */
    @IsString()
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