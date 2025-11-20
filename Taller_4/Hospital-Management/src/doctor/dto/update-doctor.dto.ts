import { PartialType } from "@nestjs/mapped-types";
import { CreateDoctorDto } from "./create-doctor.dto";
import { IsString } from "class-validator";

/**
 * DTO para la actualización de un doctor existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar un doctor.
 * Extiende de CreateDoctorDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdateDoctorDto
 * @extends {PartialType(CreateDoctorDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo número de licencia
 * const updateData: UpdateDoctorDto = {
 *   licenseNumber: "MP-789012"
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdateDoctorDto = {
 *   personaId: 2,
 *   specialtyId: 3,
 *   licenseNumber: "MP-654321"
 * };
 * 
 * // Actualización de especialidad
 * const changeSpecialty: UpdateDoctorDto = {
 *   specialtyId: 5
 * };
 * ```
 */
export class UpdateDoctorDto extends PartialType(CreateDoctorDto) { 
    
    /**
     * Número de licencia médica del doctor
     * 
     * @type {string}
     * @description Número actualizado de matrícula profesional o licencia médica del doctor
     * @optional
     * 
     * @example "MP-123456", "RM-789012", "LIC-345678", "MED-999888"
     */
    @IsString()
    licenseNumber: string;

}