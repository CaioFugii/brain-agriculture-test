import { IRepository } from '../../../commons/infra/repository/repository.interface';
import { Producer } from '../../../domain/entities/producer.entity';

export type ProducerSearchParams = {
  pageNumber: number;
  pageSize: number;
  orderBy: string;
  order: string;
  city?: string;
  state?: string;
};

export interface IProducerRepository extends IRepository<Producer> {}
