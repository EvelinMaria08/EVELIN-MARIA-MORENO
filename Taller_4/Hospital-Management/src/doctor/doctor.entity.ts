import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Person } from "../person/person.entity";
import { Appointment } from "../appointment/appointment.entity";
import { Prescription } from "../prescription/prescription.entity";
import { Specialty } from "../specialty/specialty.entity";

/**
 * Entidad que representa un doctor en el sistema médico
 * 
 * @description
 * Esta entidad almacena la información profesional específica de los doctores,
 * incluyendo su número de licencia médica y su especialidad.
 * Extiende la información personal almacenada en la entidad Person.
 * 
 * @export
 * @class Doctor
 * 
 * @example
 * ```typescript
 * const doctor = new Doctor();
 * doctor.licenseNumber = "MP-123456";
 * ```
 */
@Entity('doctor')
export class Doctor {

    /**
     * Identificador del doctor
     * 
     * @type {number}
     * @description Clave primaria autogenerada del doctor
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Número de licencia médica del doctor
     * 
     * @type {string}
     * @description Número de matrícula profesional o licencia médica que acredita al doctor
     * @minLength 2
     * @maxLength 50
     * @required
     * 
     * @example "MP-123456", "RM-789012", "LIC-345678"
     */
    @Column(
        {length: 50, type: 'varchar'}
    )
    licenseNumber: string;

    /**
     * Persona asociada con este doctor
     * 
     * @type {Person}
     * @description Relación uno a uno con la entidad Person.
     * Contiene la información personal básica del doctor (nombre, documento, contacto, etc.).
     * La clave foránea person_id se almacena en la tabla doctor.
     * Se aplica cascada para operaciones relacionadas.
     * @see {@link Person}
     */
    @OneToOne(() => Person, (person) => person.doctor, {cascade: true})
    @JoinColumn({name:'person_id'})
    person:Person;
    
    /**
     * Especialidad del doctor
     * 
     * @type {Specialty}
     * @description Relación muchos a uno con la entidad Specialty.
     * Define el área de especialización médica del doctor.
     * Múltiples doctores pueden tener la misma especialidad.
     * La clave foránea specialty_id se almacena en la tabla doctor.
     * Se aplica cascada para operaciones relacionadas.
     * @see {@link Specialty}
     */
    @ManyToOne(() => Specialty, (Especialidades) => Especialidades.propety_doctor, {cascade: true})
    @JoinColumn({name:'specialty_id'})
    specialty:Specialty; 

    /**
     * Citas asociadas con este doctor
     * 
     * @type {Appointment[]}
     * @description Relación uno a muchos con la entidad Appointment.
     * Un doctor puede tener múltiples citas médicas programadas con diferentes pacientes.
     * Se aplica cascada para operaciones relacionadas.
     * @see {@link Appointment}
     */
    @OneToMany(() => Appointment, (appointment) => appointment.doctor, {cascade: true})
    appointments:Appointment[];
}