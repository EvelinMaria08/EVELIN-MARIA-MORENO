import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsPositive } from 'class-validator';
import { CreateOfficeDto } from './create-office.dto';

/**
 * DTO para la actualización de un consultorio existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar un consultorio.
 * Extiende de CreateOfficeDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdateOfficeDto
 * @extends {PartialType(CreateOfficeDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo disponibilidad
 * const updateData: UpdateOfficeDto = {
 *   disponible: false
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdateOfficeDto = {
 *   num_consultorio: 102,
 *   piso: 2,
 *   disponible: true
 * };
 * ```
 */
export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
    /**
     * Número del consultorio
     * 
     * @type {number}
     * @description Número identificador del consultorio, debe ser un entero positivo
     * @optional
     * 
     * @example 101, 202, 305
     */
    @IsInt()
    @IsPositive()
    num_consultorio: number;

    /**
     * Piso donde se ubica el consultorio
     * 
     * @type {number}
     * @description Número de piso en el que se encuentra el consultorio
     * @optional
     * 
     * @example 1, 2, 3, -1 (sótano)
     */
    @IsInt()
    piso: number;

    /**
     * Disponibilidad del consultorio
     * 
     * @type {boolean}
     * @description Indica si el consultorio está disponible (true) u ocupado (false)
     * @optional
     * 
     * @example true, false
     */
    @IsBoolean()
    disponible: boolean;
}