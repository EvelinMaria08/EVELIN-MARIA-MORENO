import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashierModule } from './cashier/cashier.module';
import { ClientModule } from './client/client.module';
import { CoffeeModule } from './coffee/coffee.module';

@Module({
  imports: [ClientModule, CashierModule, CoffeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
