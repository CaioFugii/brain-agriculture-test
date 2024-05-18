import { Module, ValidationPipe } from '@nestjs/common';
import { ProducerController } from './presentation/http/producer.controller';
import { APP_PIPE } from '@nestjs/core';
import { IsValidArrayConstraint } from './presentation/http/dto/body-create-producer.dto';

@Module({
  imports: [],
  controllers: [ProducerController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
