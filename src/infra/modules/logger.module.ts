import { Module } from '@nestjs/common';
import { Logger } from '../../commons/application/logger/logger';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
