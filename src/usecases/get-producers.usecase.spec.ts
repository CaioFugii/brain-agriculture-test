import { Test, TestingModule } from '@nestjs/testing';
import { GetProducersUseCase } from './get-producers.usecase';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer.entity';

describe('GetProducersUseCase', () => {
  let useCase: GetProducersUseCase;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProducersUseCase,
        {
          provide: 'ProducerRepository',
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetProducersUseCase>(GetProducersUseCase);
    producerRepository = module.get<IProducerRepository>('ProducerRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return list of Producers and total count', async () => {
      const mockProducers = [
        { id: '1', name: 'Producer 1' },
        { id: '2', name: 'Producer 2' },
      ];
      const totalCount = 2;

      jest
        .spyOn(producerRepository, 'find')
        .mockResolvedValue([mockProducers as any, totalCount]);

      const result = await useCase.execute({});

      expect(producerRepository.find).toHaveBeenCalledWith({
        pageNumber: 1,
        pageSize: 10,
        orderBy: 'created_at',
        order: 'DESC',
        city: null,
        state: null,
      });
      expect(result).toEqual([mockProducers, totalCount]);
    });
  });
});
