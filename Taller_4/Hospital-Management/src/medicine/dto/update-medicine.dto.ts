import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';

/**
 * DTO para la actualización de un medicamento existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar un medicamento.
 * Extiende de CreateMedicineDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdateMedicineDto
 * @extends {PartialType(CreateMedicineDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo stock y precio
 * const updateData: UpdateMedicineDto = {
 *   id: 1,
 *   stock: 150,
 *   price: "5500"
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdateMedicineDto = {
 *   id: 1,
 *   name: "Paracetamol",
 *   type: "tablet",
 *   presentation: "500mg",
 *   stock: 200,
 *   description: "Actualizado",
 *   price: "6000"
 * };
 * ```
 */
export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {

    /**
     * ID del medicamento a actualizar
     * 
     * @type {number}
     * @description Identificador único del medicamento
     * @required
     * 
     * @example 1, 5, 10
     */
    @IsInt()
    id: number;

    /**
     * Nombre del medicamento
     * 
     * @type {string}
     * @description Nombre comercial o genérico del medicamento
     * @minLength 2
     * @maxLength 100
     * @optional
     * 
     * @example "Ibuprofeno", "Amoxicilina"
     */
    @IsString()
    @Length(2, 100)
    name: string;

    /**
     * Tipo del medicamento
     * 
     * @type {string}
     * @description Forma física de presentación del medicamento
     * @minLength 2
     * @maxLength 50
     * @optional
     * 
     * @example "tablet", "pill", "liquid", "injection"
     */
    @IsString()
    @Length(2, 50)
    type: string;

    /**
     * Presentación del medicamento
     * 
     * @type {string}
     * @description Dosificación y cantidad del medicamento
     * @minLength 2
     * @maxLength 50
     * @optional
     * 
     * @example "500mg", "100ml", "250mg/5ml"
     */
    @IsString()
    @Length(2, 50)
    presentation: string;

    /**
     * Stock disponible del medicamento
     * 
     * @type {number}
     * @description Cantidad disponible en inventario
     * @minimum 0
     * @optional
     * 
     * @example 100, 50, 200
     */
    @IsInt()
    @Min(0)
    stock: number;

    /**
     * Descripción del medicamento
     * 
     * @type {string}
     * @description Información adicional sobre el medicamento, indicaciones o advertencias
     * @minLength 2
     * @maxLength 50
     * @optional
     * 
     * @example "Analgésico y antipirético para dolores leves a moderados"
     */
    @IsString()
    @Length(2, 50)
    @IsOptional()
    description: string;

    /**
     * Precio del medicamento
     * 
     * @type {string}
     * @description Precio de venta por unidad del medicamento
     * @minimum 0
     * @optional
     * 
     * @example "5000", "12500", "3000"
     */
    @IsInt()
    @Min(0)
    price: number;
}