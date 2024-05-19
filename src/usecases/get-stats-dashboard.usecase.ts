import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';

type DashboardResponse = {
  totalAreaCount: number;
  totalAreaCountHectares: number;
  pieChartByState: { state: string; count: number }[];
  pieChartByLandUse: { land_usage: string; count: number }[];
  pieChartByPlantation: { plantation: string; count: number }[];
};

@Injectable()
export class GetStatsUseCase {
  constructor(
    @Inject('ProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(): Promise<DashboardResponse> {
    const [
      totalAreaCount,
      totalAreaCountHectares,
      pieChartByState,
      pieChartByLandUse,
      pieChartByPlantation,
    ] = await Promise.all([
      this.producerRepository.getTotalAreaCount(),
      this.producerRepository.getTotalAreaCountHectares(),
      this.producerRepository.getStatsByState(),
      this.producerRepository.getStatsByLandUsage(),
      this.producerRepository.getStatsByPlantation(),
    ]);

    return {
      totalAreaCount,
      totalAreaCountHectares,
      pieChartByState,
      pieChartByLandUse,
      pieChartByPlantation,
    };
  }
}
