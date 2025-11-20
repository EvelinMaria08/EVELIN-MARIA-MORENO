import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

@Controller('staff')
export class StaffController {

    @Post()
    createEmployee(
        @Body('name') name: string,
        @Body('role') role: string,
        @Body('salary') salary: number,
    ) {
        return {
            message: 'Empleado creado correctamente',
            data: { name, role, salary },
        };
    }

    @Get()
    getEmployees(
        @Query('role') role?: string,
        @Query('minSalary') minSalary?: number,
    ) {
        return {
            message: 'Filtros aplicados a empleados',
            data: { role, minSalary },
        };
    }

    @Patch('update-role')
    updateRole(
        @Body('id') id: number,
        @Body('newRole') newRole: string,
    ) {
        return {
            message: 'Rol del empleado actualizado',
            data: { id, newRole },
        };
    }
}
