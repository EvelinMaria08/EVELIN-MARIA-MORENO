import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { TablesModule } from './tables/tables.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [MenuModule, OrdersModule, TablesModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
