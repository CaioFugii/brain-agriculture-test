import { Module } from '@nestjs/common';
import { ProducerController } from './presentation/http/producer.controller';

@Module({
  imports: [],
  controllers: [ProducerController],
})
export class AppModule {}
