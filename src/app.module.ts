import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ProducerModule } from './infra/modules/producer.module';
import { HttpExceptionFilter } from './commons/application/filters/http-exception.filter';
import { LoggerModule } from './infra/modules/logger.module';

@Module({
  imports: [ProducerModule, LoggerModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
