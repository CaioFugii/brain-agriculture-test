import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { GetStatsUseCase } from '../../usecases/get-stats-dashboard.usecase';

describe('DashboardController', () => {
  let controller: DashboardController;
  let getStatsUseCase: GetStatsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: GetStatsUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    getStatsUseCase = module.get<GetStatsUseCase>(GetStatsUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should retrieve dashboard data', async () => {
      const mockResult = {
        totalAreaCount: 7,
        totalAreaCountHectares: 420,
        pieChartByState: [
          {
            state: 'Paraná',
            count: 1,
          },
        ],
        pieChartByLandUse: [
          {
            land_usage: 'Arable Area',
            total_area: 280,
          },
        ],
        pieChartByPlantation: [
          {
            plantation: 'Soja',
            count: 3,
          },
        ],
      };
      jest
        .spyOn(getStatsUseCase, 'execute')
        .mockResolvedValue(mockResult as any);

      const result = await controller.get();

      expect(result).toEqual(mockResult);
      expect(getStatsUseCase.execute).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const error = new Error('Error retrieving dashboard data');
      jest.spyOn(getStatsUseCase, 'execute').mockRejectedValue(error);

      await expect(controller.get()).rejects.toThrow(
        'Error retrieving dashboard data',
      );
      expect(getStatsUseCase.execute).toHaveBeenCalled();
    });
  });
});
