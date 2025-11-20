import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prescription } from "src/prescription/prescription.entity";
import { Medicine } from "src/medicine/medicine.entity";


@Entity('prescription_detail')
export class PrescriptionDetail {
    
    // Primary key of the prescription detail
    @PrimaryGeneratedColumn()
    id: number;
    
    // Dose of the prescription 
    @Column({length: 100})
    dose: string;

    // Duration of the prescription 
    @Column({type: 'int'})
    duration: number;

    // Instructions of the prescription 
    @Column({type: 'text'})
    instrucitons: string;

    //Relationships

    // Relation Prescription > PrescriptionDetail, a PrescriptionDetail can have many prescriptions
    @ManyToOne(() => Prescription, (prescription) => prescription.details, {onDelete: 'CASCADE'})
    // foreign key prescription_id JoinColumn = Define the name of the foreign key column in the prescription_detail table
    @JoinColumn({name: 'prescription_id'})
    prescription: Prescription;

    // Relation Medicine > PrescriptionDetail, a Medicine can have many prescription details
    @ManyToOne(() => Medicine, (medicine) => medicine.details)
    // foreign key medicine_id JoinColumn = Define the name of the foreign key column in the prescription_detail table
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;
    
}