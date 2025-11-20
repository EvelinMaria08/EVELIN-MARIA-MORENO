import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {

    @Post()
    createOrder(
        @Body('tableId') tableId: number,
        @Body('dish') dish: string,
        @Body('quantity') quantity: number,
    ) {
        return {
            message: 'Pedido creado correctamente',
            data: { tableId, dish, quantity },
        };
    }

    @Post('priority')
    createPriorityOrder(
        @Body('dish') dish: string,
        @Body('tableId') tableId: number,
    ) {
        return {
            message: 'Pedido prioritario registrado',
            data: { dish, tableId },
        };
    }

    @Get()
    listOrders(
        @Query('status') status: string,
        @Query('date') date: string,
    ) {
        return {
            message: 'Listado filtrado de pedidos',
            data: { status, date },
        };
    }

    @Get(':orderId')
    getOrderById(@Param('orderId') orderId: string) {
        return {
            message: 'Pedido encontrado',
            data: { orderId },
        };
    }

    @Patch('update-status')
    updateOrderStatus(
        @Body('orderId') orderId: number,
        @Body('status') status: string,
    ) {
        return {
            message: 'Estado del pedido actualizado',
            data: { orderId, status },
        };
    }

    @Patch('update-table')
    updateOrderTable(
        @Body('orderId') orderId: number,
        @Body('newTable') newTable: number,
    ) {
        return {
            message: 'Mesa del pedido actualizada',
            data: { orderId, newTable },
        };
    }
}
