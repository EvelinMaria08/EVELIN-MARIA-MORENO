import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { GetCoffeeDto } from './dto/get-coffee.dto';
import { UpdateCashRegisterDto } from './dto/update-cash-registrer.dto';

@Controller('cashier')
export class CashierController {
  @Post()
  createSalesRecord(@Body('id') id) { // el decorador Body me permite extraer datos del cuerpo de la solicitud
    return id; // retorno el id que me enviaron en el cuerpo de la solicitud
  }

  @Patch('update-cash-registrer')
  updateCashRegister(@Body() body: UpdateCashRegisterDto ) {
    // 1. Buscar el registro -> body.id
    // 2.Comprobar que la informacion sea diferente -> body.paymentMethod
    // 3. Actualizar el registro -> body.id && body.paymentMethod
    // 4. Retornar feedback
    return body;
  }


  // Ejemplos de uso de Param y Query
  // @Get(':name')
  // getCoffee(@Query() queries){
  //   return queries;
  // }

  // @Get(':name')
  // getCoffee(@Param() params){
  //   return params;
  // }

  // @Get(':paymenMethod/:name/')
  // getCoffee(@Param() params){
  //   return params;
  // }


  @Get(':paymenMethod/:name/')
  getCoffee(@Query() query: GetCoffeeDto){
    return query;
  }

  // @Get(':paymenMethod/:name/')
  // getCoffee( @Query('type') type: string, 
  // @Query('size', ParseIntPipe) size,
  // @Query('date', new ParseDatePipe()) date) {
  //   return 'Tipo ' + type + ' y tamaño ' + size + ' Onzas. Movimiento realizado en la fecha: ' + date;
  // }
}
