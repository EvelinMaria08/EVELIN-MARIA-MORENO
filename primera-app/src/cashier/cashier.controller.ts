import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('cashier')
export class CashierController {
  @Post()
  createSalesRecord() {
    return 'Tu registro de ventas ha sido creado correctamente.';
  }

  @Patch('update-cash-registrer')
  updateCashRegister() {
    return 'Se realizo un movimiento de efectivo.';
  }

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
  getCoffee(@Param() params, @Query() query){
    return {
      normalitos: params,
      queryParams: query,
    };
  }
}
