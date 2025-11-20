import {
  Controller,
  Delete,
  Param,
  Post,
} from '@nestjs/common';

@Controller('client')
export class ClientController {
    // Pedir un café
    @Post()
    askForCoffee(){
        return 'Se solicitó un café.';
    }
    @Delete('/:id/:name')
    deleteSalesRecord(@Param('id') id: string, @Param('name') name: string){
      return (
        'Se eliminó el registro del café con el id ' + id + ' y se pauso la venta de: ' + name
      );
    }
}
