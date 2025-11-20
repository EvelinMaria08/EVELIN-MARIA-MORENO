import { Appointment } from "src/appointment/appointment.entity"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entidad que representa un consultorio médico en el sistema
 * 
 * @description
 * Esta entidad almacena la información de los consultorios disponibles
 * en el centro médico, incluyendo su número, piso y disponibilidad.
 * 
 * @export
 * @class Office
 * 
 * @example
 * ```typescript
 * const office = new Office();
 * office.num_consultorio = 101;
 * office.piso = 1;
 * office.disponible = true;
 * ```
 */
@Entity('consultorio')
export class Office{
    /**
     * Clave primaria del consultorio
     * 
     * @type {number}
     * @description Identificador único autogenerado para el consultorio
     */
    @PrimaryGeneratedColumn()
    id_consultorio: number;
    
    /**
     * Número del consultorio
     * 
     * @type {number}
     * @description Número identificador del consultorio, debe ser único
     * @required
     * @unique
     * 
     * @example 101, 202, 305
     */
    @Column({unique: true})
    num_consultorio: number;

    /**
     * Piso donde se ubica el consultorio
     * 
     * @type {number}
     * @description Número de piso en el que se encuentra el consultorio
     * @required
     * 
     * @example 1, 2, 3
     */
    @Column()
    piso: number;

    /**
     * Disponibilidad del consultorio
     * 
     * @type {boolean}
     * @description Indica si el consultorio está disponible (true) u ocupado (false)
     * @default true
     * @required
     * 
     * @example true, false
     */
    @Column({type: 'boolean', default: true})
    disponible: boolean

    /**
     * Citas asociadas con este consultorio
     * 
     * @type {Appointment[]}
     * @description Relación uno a muchos con la entidad Appointment.
     * Un consultorio puede tener múltiples citas asignadas.
     * Se aplica cascada para operaciones relacionadas.
     * @see {@link Appointment}
     */
    @OneToMany(() => Appointment, (Cita) => Cita.office, {cascade: true})
    property_cita: Appointment[];
}