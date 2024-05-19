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

export interface IProducerRepository extends IRepository<Producer> {
  getTotalAreaCount(): Promise<number>;
  getTotalAreaCountHectares(): Promise<number>;
  getStatsByState(): Promise<{ state: string; count: number }[]>;
  getStatsByLandUsage(): Promise<{ land_usage: string; count: number }[]>;
  getStatsByPlantation(): Promise<{ plantation: string; count: number }[]>;
}
