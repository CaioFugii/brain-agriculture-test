import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from '../../usecases/create-producer.usecase';
import { ProducerController } from '../../presentation/http/producer.controller';
import { TypeOrmProducerRepository } from '../database/postgres/producer.repository';
import { Logger } from '../../commons/application/logger/logger';
import { UpdateProducerUseCase } from '../../usecases/update-producer.usecase';
import { GetByIdProducerUseCase } from '../../usecases/get-by-id-producer.usecase';
import { DeleteProducerUseCase } from '../../usecases/delete-producer.usecase';

@Module({
  imports: [],
  controllers: [ProducerController],
  providers: [
    Logger,
    CreateProducerUseCase,
    UpdateProducerUseCase,
    GetByIdProducerUseCase,
    DeleteProducerUseCase,
    { provide: 'ProducerRepository', useClass: TypeOrmProducerRepository },
  ],
})
export class ProducerModule {}
