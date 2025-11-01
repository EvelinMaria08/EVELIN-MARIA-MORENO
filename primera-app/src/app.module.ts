import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { CashierModule } from './cashier/cashier.module';
import { CoffeeModule } from './coffee/coffee.module';
import { ClientController } from './client/client.controller';

@Module({
  imports: [ClientModule, CashierModule, CoffeeModule],
  controllers: [AppController, ClientController],
  providers: [AppService],
})
export class AppModule {}
