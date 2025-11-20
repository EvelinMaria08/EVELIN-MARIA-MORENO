import { IsInt, IsString, Length } from "class-validator";

/**
 * DTO para la creación de un nuevo doctor
 * 
 * @description
 * Define la estructura y validaciones requeridas para crear un doctor en el sistema médico.
 * Utiliza class-validator para garantizar la integridad de los datos.
 * Requiere que tanto la persona como la especialidad ya estén registradas en el sistema.
 * 
 * @export
 * @class CreateDoctorDto
 * 
 * @example
 * ```typescript
 * const newDoctor: CreateDoctorDto = {
 *   personaId: 1,
 *   specialtyId: 2,
 *   licenseNumber: "MP-123456"
 * };
 * ```
 */
export class CreateDoctorDto {

    /**
     * ID de la persona asociada al doctor
     * 
     * @type {number}
     * @description Identificador de la persona en el sistema que será registrada como doctor.
     * Debe corresponder a una persona existente con rol de doctor.
     * @required
     * 
     * @example 1, 5, 10
     */
    @IsInt()
    personaId: number;

    /**
     * ID de la especialidad del doctor
     * 
     * @type {number}
     * @description Identificador de la especialidad médica a la que pertenece el doctor.
     * Debe corresponder a una especialidad existente en el sistema.
     * @required
     * 
     * @example 1 (Cardiología), 2 (Pediatría), 3 (Dermatología)
     */
    @IsInt()
    specialtyId: number;

    /**
     * Número de licencia médica del doctor
     * 
     * @type {string}
     * @description Número de matrícula profesional o licencia médica que acredita al doctor
     * para ejercer la medicina. Debe ser único para cada doctor.
     * @minLength 2
     * @maxLength 100
     * @required
     * 
     * @example "MP-123456", "RM-789012", "LIC-345678", "MED-456789"
     */
    @IsString()
    @Length(2, 100)
    licenseNumber: string;
}