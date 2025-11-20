import {
  Controller,
  Post,
} from '@nestjs/common';

@Controller('cashier')
export class CashierController {
    @Post()
    createSalesRecord() {
        return 'Tu registro de ventas ha sido creado correctamente.';
    }
}
