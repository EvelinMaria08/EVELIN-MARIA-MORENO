import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Patient } from 'src/patient/patient.entity';

/**
 * Servicio para gestionar las operaciones de facturas
 * 
 * @description
 * Este servicio proporciona métodos para realizar operaciones CRUD
 * sobre la entidad Invoice, incluyendo la creación, lectura,
 * actualización y eliminación de facturas, así como el manejo
 * de sus relaciones con Appointment y Patient.
 * 
 * @export
 * @class InvoiceService
 */
@Injectable()
export class InvoiceService {
  /**
   * Constructor del servicio de facturas
   * 
   * @param {Repository<Invoice>} invoiceRepository - Repositorio de TypeORM para la entidad Invoice
   * @param {Repository<Appointment>} appointmentRepository - Repositorio de TypeORM para la entidad Appointment
   * @param {Repository<Patient>} patientRepository - Repositorio de TypeORM para la entidad Patient
   */
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  /**
   * Crea una nueva factura en la base de datos
   * 
   * @description
   * Crea una factura asociándola con una cita y un paciente existentes.
   * Verifica que tanto la cita como el paciente existan antes de crear la factura.
   * Si no se proporciona estado de pago, se establece como 'Pendiente' por defecto.
   * 
   * @param {CreateInvoiceDto} dto - Datos de la factura a crear
   * @returns {Promise<Invoice>} La factura creada con sus relaciones
   * @throws {Error} Si la cita con el ID proporcionado no existe
   * @throws {Error} Si el paciente con el ID proporcionado no existe
   * 
   * @example
   * ```typescript
   * const newInvoice = await invoiceService.create({
   *   id_cita: 1,
   *   id_paciente: 5,
   *   total: 150000.00,
   *   metodo_pago: "Tarjeta de crédito",
   *   estado_pago: "Pendiente"
   * });
   * ```
   */
  async create(dto: CreateInvoiceDto) {
    // Busca la cita
    const appointment = await this.appointmentRepository.findOne({
      where: { id: dto.id_cita },
    });
    if (!appointment) throw new Error('Appointment not found');
    
    // Busca el paciente
    const patient = await this.patientRepository.findOne({
      where: { id: dto.id_paciente },
    });
    if (!patient) throw new Error('Patient not found');

    // Crea la factura con las relaciones correctas
    const invoice = this.invoiceRepository.create({
      total: dto.total,
      metodo_pago: dto.metodo_pago,
      estado_pago: dto.estado_pago || 'Pendiente',
      propety_cita: appointment,
      propety_patient: patient,
    });

    return this.invoiceRepository.save(invoice);
  }

  /**
   * Obtiene todas las facturas registradas con sus relaciones
   * 
   * @returns {Promise<Invoice[]>} Array con todas las facturas incluyendo citas y pacientes
   * 
   * @example
   * ```typescript
   * const invoices = await invoiceService.findAll();
   * // Retorna facturas con propety_cita y propety_patient poblados
   * ```
   */
  findAll() {
    return this.invoiceRepository.find({
      relations: ['propety_cita', 'propety_patient'],
    });
  }

  /**
   * Busca una factura por su ID con sus relaciones
   * 
   * @param {number} id - ID de la factura a buscar
   * @returns {Promise<Invoice>} La factura encontrada con sus relaciones
   * @throws {Error} Si la factura no existe
   * 
   * @example
   * ```typescript
   * const invoice = await invoiceService.findOne(1);
   * ```
   */
  async findOne(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id_factura: id },
      relations: ['propety_cita', 'propety_patient'],
    });
    if (!invoice) throw new Error('Invoice not found');
    return invoice;
  }

  /**
   * Actualiza una factura existente
   * 
   * @description
   * Actualiza los datos de una factura incluyendo sus relaciones.
   * Verifica la existencia de la factura y de las entidades relacionadas antes de actualizar.
   * Permite actualizar la cita asociada, el paciente y los campos simples.
   * 
   * @param {number} id - ID de la factura a actualizar
   * @param {UpdateInvoiceDto} dto - Datos actualizados de la factura
   * @returns {Promise<Invoice>} La factura actualizada con sus relaciones
   * @throws {Error} Si la factura no existe
   * @throws {Error} Si la nueva cita especificada no existe
   * @throws {Error} Si el nuevo paciente especificado no existe
   * 
   * @example
   * ```typescript
   * const updated = await invoiceService.update(1, {
   *   total: 200000.00,
   *   estado_pago: "Pagado"
   * });
   * ```
   */
  async update(id: number, dto: UpdateInvoiceDto) {
    // Verificación de existencia de la factura
    const invoice = await this.findOne(id);

    // Si se envía nuevo id_cita, actualiza la relación
    if (dto.id_cita) {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: dto.id_cita },
      });
      if (!appointment) throw new Error('Appointment not found');
      invoice.propety_cita = appointment;
    }

    // Si se envía nuevo id_paciente, actualiza la relación
    if (dto.id_paciente) {
      const patient = await this.patientRepository.findOne({
        where: { id: dto.id_paciente },
      });
      if (!patient) throw new Error('Patient not found');
      invoice.propety_patient = patient;
    }

    // Actualiza campos simples
    Object.assign(invoice, dto);
    return this.invoiceRepository.save(invoice);
  }

  /**
   * Elimina una factura por su ID
   * 
   * @description
   * Verifica la existencia de la factura antes de eliminarla y retorna
   * un mensaje de confirmación tras la eliminación exitosa.
   * 
   * @param {number} id - ID de la factura a eliminar
   * @returns {Promise<{message: string}>} Mensaje de confirmación de eliminación
   * @throws {Error} Si la factura no existe
   * 
   * @example
   * ```typescript
   * const result = await invoiceService.remove(1);
   * // Retorna: { message: "Invoice with id 1 deleted successfully" }
   * ```
   */
  async remove(id: number) {
    const invoice = await this.findOne(id);
    await this.invoiceRepository.remove(invoice);
    return { message: `Invoice with id ${id} deleted successfully` };
  }
}