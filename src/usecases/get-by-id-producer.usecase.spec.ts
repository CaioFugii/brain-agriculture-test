import { Test, TestingModule } from '@nestjs/testing';
import { GetByIdProducerUseCase } from './get-by-id-producer.usecase';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { NotFoundException } from '@nestjs/common';
import { Producer } from '../domain/entities/producer.entity';

describe('GetByIdProducerUseCase', () => {
  let useCase: GetByIdProducerUseCase;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetByIdProducerUseCase,
        {
          provide: 'ProducerRepository',
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetByIdProducerUseCase>(GetByIdProducerUseCase);
    producerRepository = module.get<IProducerRepository>('ProducerRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return the Producer with the given ID', async () => {
      const id = 'existing-id';
      const mockProducer = { id, name: 'Test Producer' };

      jest
        .spyOn(producerRepository, 'findById')
        .mockResolvedValue(mockProducer as any);

      const result = await useCase.execute(id);

      expect(producerRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProducer);
    });

    it('should throw a NotFoundException if Producer is not found', async () => {
      const id = 'non-existing-id';
      jest.spyOn(producerRepository, 'findById').mockResolvedValue(null);

      await expect(useCase.execute(id)).rejects.toThrow(NotFoundException);
      expect(producerRepository.findById).toHaveBeenCalledWith(id);
    });
  });
});
