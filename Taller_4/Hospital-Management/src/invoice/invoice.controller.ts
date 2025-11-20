import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

/**
 * Controlador para gestionar las operaciones REST de facturas
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre las facturas del sistema médico. Maneja las peticiones HTTP y delega
 * la lógica de negocio al servicio InvoiceService.
 * 
 * @route /invoice
 * @export
 * @class InvoiceController
 */
@Controller('invoice')
export class InvoiceController {
  /**
   * Constructor del controlador de facturas
   * 
   * @param {InvoiceService} invoiceService - Servicio que maneja la lógica de negocio de facturas
   */
  constructor(private readonly invoiceService: InvoiceService) {}

  /**
   * Crea una nueva factura
   * 
   * @route POST /invoice
   * @param {CreateInvoiceDto} createInvoiceDto - Datos de la factura a crear
   * @returns {Promise<Invoice>} La factura creada con sus relaciones
   * 
   * @example
   * POST http://localhost:3000/invoice
   * Body:
   * ```json
   * {
   *   "id_cita": 1,
   *   "id_paciente": 5,
   *   "total": 150000.00,
   *   "metodo_pago": "Tarjeta de crédito",
   *   "estado_pago": "Pendiente"
   * }
   * ```
   */
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  /**
   * Obtiene todas las facturas
   * 
   * @route GET /invoice
   * @returns {Promise<Invoice[]>} Lista de todas las facturas con sus citas y pacientes asociados
   * 
   * @example
   * GET http://localhost:3000/invoice
   */
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  /**
   * Obtiene una factura por su ID
   * 
   * @route GET /invoice/:id
   * @param {string} id - ID de la factura a buscar
   * @returns {Promise<Invoice>} La factura encontrada con sus relaciones
   * 
   * @example
   * GET http://localhost:3000/invoice/1
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.invoiceService.findOne(id);
  }

  /**
   * Actualiza una factura existente
   * 
   * @route PATCH /invoice/:id
   * @param {string} id - ID de la factura a actualizar
   * @param {UpdateInvoiceDto} updateInvoiceDto - Datos actualizados de la factura
   * @returns {Promise<Invoice>} La factura actualizada con sus relaciones
   * 
   * @example
   * PATCH http://localhost:3000/invoice/1
   * Body:
   * ```json
   * {
   *   "total": 200000.00,
   *   "estado_pago": "Pagado",
   *   "metodo_pago": "Efectivo"
   * }
   * ```
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  /**
   * Elimina una factura por su ID
   * 
   * @route DELETE /invoice/:id
   * @param {string} id - ID de la factura a eliminar
   * @returns {Promise<{message: string}>} Mensaje de confirmación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/invoice/1
   * // Retorna: { "message": "Invoice with id 1 deleted successfully" }
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.invoiceService.remove(id);
  }
}