// Importación de la clase doctor para usar la entidad y hacer la relación en la BD 
import { Doctor } from "../doctor/doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entidad que representa una especialidad médica en el sistema
 * 
 * @description
 * Esta entidad almacena la información de las especialidades médicas disponibles,
 * permitiendo la clasificación de los doctores según su área de especialización.
 * 
 * @export
 * @class Specialty
 * 
 * @example
 * ```typescript
 * const specialty = new Specialty();
 * specialty.name = "Cardiología";
 * specialty.description = "Especialidad médica dedicada al estudio del corazón";
 * ```
 */
@Entity('especialidades')
export class Specialty{

    /**
     * Clave primaria de la especialidad
     * 
     * @type {number}
     * @description Identificador único autogenerado para la especialidad
     */
    @PrimaryGeneratedColumn()
    id_especialidad: number;

    /**
     * Nombre de la especialidad
     * 
     * @type {string}
     * @description Nombre de la especialidad médica, debe ser único
     * @minLength 2
     * @maxLength 100
     * @unique
     * @required
     * 
     * @example "Cardiología", "Pediatría", "Dermatología"
     */
    @Column({unique: true, length:100})
    name: string;

    /**
     * Descripción de la especialidad
     * 
     * @type {string}
     * @description Información adicional sobre la especialidad, sus campos de acción o características
     * @optional
     * 
     * @example "Especialidad dedicada al diagnóstico y tratamiento de enfermedades del corazón"
     */
    @Column({nullable: true})
    description: string;

    /**
     * Doctores asociados con esta especialidad
     * 
     * @type {Doctor[]}
     * @description Relación uno a muchos con la entidad Doctor.
     * Una especialidad puede tener múltiples doctores asociados.
     * @see {@link Doctor}
     */
    @OneToMany(() => Doctor, (Doctor_Alias) => Doctor_Alias.specialty)
    propety_doctor: Doctor[];
}