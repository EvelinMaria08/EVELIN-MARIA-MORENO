import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';

@Controller('tables')
export class TablesController {

    @Post()
    createTable(
        @Body('number') number: number,
        @Body('capacity') capacity: number,
    ) {
        return {
            message: 'Mesa creada correctamente',
            data: { number, capacity },
        };
    }

    @Post('capacity')
    registerCapacity(
        @Body('tableId') tableId: number,
        @Body('capacity') capacity: number,
    ) {
        return {
            message: 'Capacidad de mesa actualizada',
            data: { tableId, capacity },
        };
    }

    @Get()
    listTables(@Query('available') available: string) {
        return {
            message: 'Listando mesas según disponibilidad',
            data: { available },
        };
    }

    @Get(':number')
    getTable(@Param('number') number: string) {
        return {
            message: 'Mesa encontrada',
            data: { number },
        };
    }
}
    