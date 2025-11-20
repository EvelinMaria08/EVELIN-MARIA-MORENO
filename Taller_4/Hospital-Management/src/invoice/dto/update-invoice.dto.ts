import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsNumber, IsString, IsOptional } from 'class-validator';

/**
 * DTO para la actualización de una factura existente
 * 
 * @description
 * Define la estructura y validaciones para actualizar una factura.
 * Extiende de CreateInvoiceDto usando PartialType, lo que hace que
 * todas las propiedades sean opcionales, permitiendo actualizaciones parciales.
 * 
 * @export
 * @class UpdateInvoiceDto
 * @extends {PartialType(CreateInvoiceDto)}
 * 
 * @example
 * ```typescript
 * // Actualización parcial - solo estado de pago
 * const updateData: UpdateInvoiceDto = {
 *   id_factura: 1,
 *   estado_pago: "Pagado"
 * };
 * 
 * // Actualización de método de pago y total
 * const updatePayment: UpdateInvoiceDto = {
 *   id_factura: 1,
 *   total: 200000.00,
 *   metodo_pago: "Efectivo"
 * };
 * 
 * // Actualización completa
 * const fullUpdate: UpdateInvoiceDto = {
 *   id_factura: 1,
 *   total: 175000.50,
 *   metodo_pago: "Transferencia bancaria",
 *   estado_pago: "Pagado",
 *   id_paciente: 3,
 *   id_cita: 2
 * };
 * ```
 */
export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {

    /**
     * Monto total de la factura
     * 
     * @type {number}
     * @description Valor actualizado del total a pagar por los servicios médicos
     * @optional
     * 
     * @example 150000.00, 75500.50, 1250000.99
     */
    @IsNumber()
    total: number;

    /**
     * Método de pago utilizado
     * 
     * @type {string}
     * @description Forma de pago actualizada para cancelar la factura
     * @optional
     * 
     * @example "Efectivo", "Tarjeta de crédito", "Tarjeta de débito", "Transferencia bancaria", "PSE"
     */
    @IsString()
    metodo_pago: string;
    
    /**
     * Estado del pago de la factura
     * 
     * @type {string}
     * @description Estado actualizado del pago de la factura
     * @optional
     * 
     * @example "Pendiente", "Pagado", "Fallido", "Cancelado"
     */
    @IsString()
    @IsOptional()
    estado_pago?: string;   

    /**
     * ID de la factura
     * 
     * @type {number}
     * @description Identificador único de la factura a actualizar
     * @required
     * 
     * @example 1, 5, 10
     */
    @IsNumber()
    id_factura: number;
}