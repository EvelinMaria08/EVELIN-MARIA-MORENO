import { IsDateString, IsNumber, IsString, IsOptional } from "class-validator";

/**
 * DTO para la creación de una nueva factura
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear una factura en el sistema médico.
 * Utiliza class-validator para garantizar la integridad de los datos financieros.
 * Requiere que tanto el paciente como la cita ya estén registrados en el sistema.
 * 
 * @export
 * @class CreateInvoiceDto
 * 
 * @example
 * ```typescript
 * const newInvoice: CreateInvoiceDto = {
 *   total: 150000.00,
 *   metodo_pago: "Tarjeta de crédito",
 *   estado_pago: "Pendiente",
 *   id_paciente: 5,
 *   id_cita: 1
 * };
 * ```
 */
export class CreateInvoiceDto {
    /**
     * Fecha y hora de emisión de la factura
     * 
     * @type {Date}
     * @description Fecha y hora de generación de la factura en formato ISO 8601.
     * Es opcional porque se autogenera automáticamente con CURRENT_TIMESTAMP en la base de datos.
     * @optional
     * 
     * @example "2024-03-15T10:30:00", new Date("2024-03-15")
     */
    @IsDateString()
    @IsOptional() // porque el valor se autogenera en la BD
    fecha?: Date;

    /**
     * Monto total de la factura
     * 
     * @type {number}
     * @description Valor total a pagar por los servicios médicos prestados.
     * Debe ser un número decimal positivo.
     * @required
     * 
     * @example 150000.00, 75500.50, 1250000.99
     */
    @IsNumber()
    total: number;

    /**
     * Método de pago utilizado
     * 
     * @type {string}
     * @description Forma de pago seleccionada por el paciente para cancelar la factura
     * @required
     * 
     * @example "Efectivo", "Tarjeta de crédito", "Tarjeta de débito", "Transferencia bancaria", "PSE"
     */
    @IsString()
    metodo_pago: string;

    /**
     * Estado del pago de la factura
     * 
     * @type {string}
     * @description Indica el estado actual del pago de la factura.
     * Es opcional porque se establece como "Pendiente" por defecto en la base de datos.
     * @optional
     * @default "Pendiente"
     * 
     * @example "Pendiente", "Pagado", "Fallido", "Cancelado"
     */
    @IsString()
    @IsOptional()
    estado_pago?: string;

    /**
     * ID del paciente asociado a la factura
     * 
     * @type {number}
     * @description Identificador del paciente que debe pagar la factura.
     * Debe corresponder a un paciente existente en el sistema.
     * @required
     * 
     * @example 1, 5, 10
     */
    @IsNumber()
    id_paciente: number;

    /**
     * ID de la cita asociada a la factura
     * 
     * @type {number}
     * @description Identificador de la cita médica por la cual se genera la factura.
     * Debe corresponder a una cita existente en el sistema.
     * @required
     * 
     * @example 1, 3, 7
     */
    @IsNumber()
    id_cita: number;
}