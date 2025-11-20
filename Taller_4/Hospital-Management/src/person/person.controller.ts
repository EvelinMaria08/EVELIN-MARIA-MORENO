import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person, Role } from './person.entity';

/**
 * Controlador para gestionar las operaciones REST de personas
 * 
 * @description
 * Este controlador expone los endpoints HTTP para realizar operaciones CRUD
 * sobre las personas del sistema. Maneja las peticiones HTTP y delega la lógica
 * de negocio al servicio PersonService. Incluye endpoints para búsqueda por rol.
 * 
 * @route /person
 * @export
 * @class PersonController
 */
@Controller('person')
export class PersonController {
  /**
   * Constructor del controlador de personas
   * 
   * @param {PersonService} personService - Servicio que maneja la lógica de negocio de personas
   */
  constructor(private readonly personService: PersonService) {}

  /**
   * Crea una nueva persona
   * 
   * @route POST /person
   * @param {CreatePersonDto} dto - Datos de la persona a crear
   * @returns {Promise<Person>} La persona creada con la contraseña hasheada
   * 
   * @example
   * POST http://localhost:3000/person
   * Body:
   * ```json
   * {
   *   "name": "Juan",
   *   "lastName": "Pérez",
   *   "document": "1234567890",
   *   "email": "juan@example.com",
   *   "phone": "3001234567",
   *   "password": "securePass123",
   *   "role": "paciente",
   *   "birthDate": "1990-05-15"
   * }
   * ```
   */
  @Post()
  create(@Body() dto: CreatePersonDto): Promise<Person> {
    return this.personService.create(dto);
  }

  /**
   * Obtiene todas las personas
   * 
   * @route GET /person
   * @returns {Promise<Person[]>} Lista de todas las personas registradas
   * 
   * @example
   * GET http://localhost:3000/person
   */
  @Get()
  findAll() {
    return this.personService.findAll();
  }

  /**
   * Obtiene una persona por su ID
   * 
   * @route GET /person/:id
   * @param {number} id - ID de la persona a buscar
   * @returns {Promise<Person>} La persona encontrada
   * 
   * @example
   * GET http://localhost:3000/person/1
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }

  /**
   * Obtiene personas por su rol
   * 
   * @route GET /person/role/:role
   * @param {Role} role - Rol a filtrar (doctor, paciente, admin)
   * @returns {Promise<Person[]>} Lista de personas con el rol especificado
   * 
   * @example
   * GET http://localhost:3000/person/role/doctor
   * GET http://localhost:3000/person/role/paciente
   * GET http://localhost:3000/person/role/admin
   */
  @Get('role/:role')
  findByRole(@Param('role') role: Role) {
    return this.personService.findByrole(role);
  }

  /**
   * Actualiza una persona existente
   * 
   * @route PATCH /person/:id
   * @param {number} id - ID de la persona a actualizar
   * @param {UpdatePersonDto} dto - Datos actualizados de la persona
   * @returns {Promise<Person>} La persona actualizada
   * 
   * @example
   * PATCH http://localhost:3000/person/1
   * Body:
   * ```json
   * {
   *   "phone": "3009876543",
   *   "email": "newemail@example.com"
   * }
   * ```
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePersonDto) {
    return this.personService.update(id, dto);
  }

  /**
   * Elimina una persona por su ID
   * 
   * @route DELETE /person/:id
   * @param {number} id - ID de la persona a eliminar
   * @returns {Promise<DeleteResult>} Resultado de la operación de eliminación
   * 
   * @example
   * DELETE http://localhost:3000/person/1
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}