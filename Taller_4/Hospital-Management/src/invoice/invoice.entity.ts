import { Appointment } from "src/appointment/appointment.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "src/patient/patient.entity";

/**
 * Entidad que representa una factura en el sistema médico
 * 
 * @description
 * Esta entidad almacena la información de las facturas generadas por servicios médicos,
 * incluyendo fecha de emisión, monto total, método de pago y estado del pago.
 * Está asociada tanto a citas médicas como a pacientes.
 * 
 * @export
 * @class Invoice
 * 
 * @example
 * ```typescript
 * const invoice = new Invoice();
 * invoice.total = 150000.00;
 * invoice.metodo_pago = "Tarjeta de crédito";
 * invoice.estado_pago = "Pendiente";
 * ```
 */
@Entity('factura')
export class Invoice {
    /**
     * Clave primaria de la factura
     * 
     * @type {number}
     * @description Identificador único autogenerado para la factura
     */
    @PrimaryGeneratedColumn()
    id_factura: number;

    /**
     * Fecha y hora de emisión de la factura
     * 
     * @type {Date}
     * @description Fecha y hora exacta en que se generó la factura en formato timestamp.
     * Se establece automáticamente con la fecha y hora actual al crear el registro.
     * @default CURRENT_TIMESTAMP
     * 
     * @example new Date("2024-03-15T10:30:00")
     */
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fecha: Date;

    /**
     * Monto total de la factura
     * 
     * @type {number}
     * @description Valor total a pagar por los servicios médicos prestados.
     * Soporta hasta 10 dígitos en total con 2 decimales de precisión.
     * @precision 10 dígitos máximos
     * @scale 2 dígitos después del punto decimal
     * @required
     * 
     * @example 150000.00, 75500.50, 1250000.99
     */
    @Column({type: 'decimal', precision: 10, scale: 2})
    total: number;

    /**
     * Método de pago utilizado
     * 
     * @type {string}
     * @description Forma de pago seleccionada por el paciente para cancelar la factura
     * @maxLength 50
     * @required
     * 
     * @example "Efectivo", "Tarjeta de crédito", "Tarjeta de débito", "Transferencia bancaria", "PSE"
     */
    @Column({type: 'varchar', length: 50})
    metodo_pago: string;

    /**
     * Estado del pago de la factura
     * 
     * @type {string}
     * @description Indica el estado actual del pago de la factura
     * @maxLength 50
     * @default "Pendiente"
     * @required
     * 
     * @example "Pendiente", "Pagado", "Fallido", "Cancelado"
     */
    @Column({type: 'varchar', length: 50, default: 'Pendiente'})
    estado_pago: string;

    /**
     * Cita asociada con esta factura
     * 
     * @type {Appointment}
     * @description Relación muchos a uno con la entidad Appointment.
     * Múltiples facturas pueden estar asociadas a una misma cita.
     * La clave foránea id_cita se almacena en la tabla factura.
     * Si la cita es eliminada, todas sus facturas también se eliminarán (CASCADE).
     * @see {@link Appointment}
     */
    @ManyToOne(() => Appointment, (Cita) => Cita.invoice, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_cita'})
    propety_cita: Appointment;

    /**
     * Paciente asociado con esta factura
     * 
     * @type {Patient}
     * @description Relación muchos a uno con la entidad Patient.
     * Múltiples facturas pueden pertenecer a un mismo paciente.
     * La clave foránea id_paciente se almacena en la tabla factura.
     * Si el paciente es eliminado, todas sus facturas también se eliminarán (CASCADE).
     * @see {@link Patient}
     */
    @ManyToOne(() => Patient, (paciente) => paciente.invoices, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_paciente'})
    propety_patient: Patient;
}