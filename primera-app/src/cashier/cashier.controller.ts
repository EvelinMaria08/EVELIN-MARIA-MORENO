import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
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

  @Get(':name')
  getCoffee(@Param('name') name: string) {
    return 'Se retorna el café para ' + name;
  }
}
