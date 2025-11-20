import { IsInt, IsString, IsNotEmpty, Length } from "class-validator";

/**
 * DTO para la creación de un nuevo paciente
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear un paciente en el sistema médico.
 * Utiliza class-validator para garantizar la integridad de los datos clínicos.
 * Requiere que la persona ya esté registrada en el sistema.
 * 
 * @export
 * @class CreatePatientDto
 * 
 * @example
 * ```typescript
 * const newPatient: CreatePatientDto = {
 *   personId: 1,
 *   bloodType: "O+",
 *   insurance: "contributive",
 *   medicalHistory: "Hipertensión controlada, alergia a la penicilina"
 * };
 * ```
 */
export class CreatePatientDto {

    /**
     * ID de la persona asociada al paciente
     * 
     * @type {number}
     * @description Identificador de la persona en el sistema que será registrada como paciente
     * @required
     * 
     * @example 1, 5, 10
     */
    @IsInt()
    @IsNotEmpty()
    personId: number;

    /**
     * Tipo de sangre del paciente
     * 
     * @type {string}
     * @description Grupo sanguíneo del paciente según clasificación ABO y factor Rh
     * @minLength 2
     * @maxLength 10
     * @required
     * 
     * @example "O+", "A-", "AB+", "B-", "O-", "A+", "AB-", "B+"
     */
    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    bloodType?: string;

    /**
     * Tipo de seguro médico del paciente
     * 
     * @type {string}
     * @description Régimen de afiliación al sistema de salud del paciente
     * @required
     * 
     * @example "contributive" (régimen contributivo), "subsidized" (régimen subsidiado), "free" (sin seguro)
     */
    @IsString()
    @IsNotEmpty()
    insurance?: string;

    /**
     * Historial médico del paciente
     * 
     * @type {string}
     * @description Registro completo de condiciones médicas previas, alergias, cirugías, tratamientos y medicamentos
     * @required
     * 
     * @example "Hipertensión controlada desde 2018, alergia a la penicilina, apendicectomía en 2015, tratamiento con Losartán 50mg"
     */
    @IsString()
    @IsNotEmpty()
    medicalHistory: string;

}