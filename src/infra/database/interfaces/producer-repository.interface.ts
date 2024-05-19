import { IRepository } from '../../../commons/infra/repository/repository.interface';
import { Producer } from '../../../domain/entities/producer';

export interface IProducerRepository extends IRepository<Producer> {}
