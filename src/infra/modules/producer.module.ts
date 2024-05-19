import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from '../../usecases/create-producer.usecase';
import { ProducerController } from '../../presentation/http/producer.controller';
import { Logger } from '../../commons/application/logger/logger';
import { UpdateProducerUseCase } from '../../usecases/update-producer.usecase';
import { GetByIdProducerUseCase } from '../../usecases/get-by-id-producer.usecase';
import { DeleteProducerUseCase } from '../../usecases/delete-producer.usecase';
import { GetProducersUseCase } from '../../usecases/get-producers.usecase';
import { TypeOrmProducerRepository } from '../database/postgres/producer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerTypeOrmEntity } from '../database/postgres/typeorm/producer.entity';
import { DashboardController } from '../../presentation/http/dashboard.controller';
import { GetStatsUseCase } from '../../usecases/get-stats-dashboard.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerTypeOrmEntity])],
  controllers: [ProducerController, DashboardController],
  providers: [
    Logger,
    GetStatsUseCase,
    CreateProducerUseCase,
    UpdateProducerUseCase,
    GetByIdProducerUseCase,
    DeleteProducerUseCase,
    GetProducersUseCase,
    { provide: 'ProducerRepository', useClass: TypeOrmProducerRepository },
  ],
})
export class ProducerModule {}
