import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';

@Controller('menu')
export class MenuController {

    @Post()
    createDish(@Body() dto: CreateDishDto) {
        return {
            message: 'Plato creado correctamente',
            data: dto,
        };
    }

    @Post('duplicate')
    duplicateDish(@Body('id') id: number) {
        return {
            message: 'Plato duplicado',
            data: { id },
        };
    }

    @Get()
    listMenu(@Query('category') category: string) {
        return {
            message: 'Listado de platos filtrados',
            data: { category },
        };
    }

    @Get(':id')
    getDishById(@Param('id') id: string) {
        return {
            message: 'Plato encontrado',
            data: { id },
        };
    }
}
