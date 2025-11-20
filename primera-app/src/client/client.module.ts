import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  controllers: [ClientController],   // <-- FALTA ESTO
  providers: [ClientService],
})
export class ClientModule {}
