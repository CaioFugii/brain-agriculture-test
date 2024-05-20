import { Test, TestingModule } from '@nestjs/testing';
import { GetStatsUseCase } from './get-stats-dashboard.usecase';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';

describe('GetStatsUseCase', () => {
  let useCase: GetStatsUseCase;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStatsUseCase,
        {
          provide: 'ProducerRepository',
          useValue: {
            getTotalAreaCount: jest.fn(),
            getTotalAreaCountHectares: jest.fn(),
            getStatsByState: jest.fn(),
            getStatsByLandUsage: jest.fn(),
            getStatsByPlantation: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetStatsUseCase>(GetStatsUseCase);
    producerRepository = module.get<IProducerRepository>('ProducerRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return the dashboard statistics', async () => {
      const mockDashboardResponse = {
        totalAreaCount: 1000,
        totalAreaCountHectares: 500,
        pieChartByState: [
          { state: 'State1', count: 10 },
          { state: 'State2', count: 20 },
        ],
        pieChartByLandUse: [
          { land_usage: 'LandUse1', count: 30 },
          { land_usage: 'LandUse2', count: 40 },
        ],
        pieChartByPlantation: [
          { plantation: 'Plantation1', count: 50 },
          { plantation: 'Plantation2', count: 60 },
        ],
      };

      jest
        .spyOn(producerRepository, 'getTotalAreaCount')
        .mockResolvedValue(mockDashboardResponse.totalAreaCount);
      jest
        .spyOn(producerRepository, 'getTotalAreaCountHectares')
        .mockResolvedValue(mockDashboardResponse.totalAreaCountHectares);
      jest
        .spyOn(producerRepository, 'getStatsByState')
        .mockResolvedValue(mockDashboardResponse.pieChartByState);
      jest
        .spyOn(producerRepository, 'getStatsByLandUsage')
        .mockResolvedValue(mockDashboardResponse.pieChartByLandUse);
      jest
        .spyOn(producerRepository, 'getStatsByPlantation')
        .mockResolvedValue(mockDashboardResponse.pieChartByPlantation);

      const result = await useCase.execute();

      expect(result).toEqual(mockDashboardResponse);
    });
  });
});
