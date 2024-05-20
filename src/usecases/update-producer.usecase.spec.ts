import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProducerUseCase } from './update-producer.usecase';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { NotFoundException } from '@nestjs/common';
import { Producer } from '../domain/entities/producer.entity';

describe('UpdateProducerUseCase', () => {
  let useCase: UpdateProducerUseCase;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProducerUseCase,
        {
          provide: 'ProducerRepository',
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateProducerUseCase>(UpdateProducerUseCase);
    producerRepository = module.get<IProducerRepository>('ProducerRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should update the Producer with the given ID', async () => {
      const id = 'existing-id';
      const mockProducer = { id, name: 'Test Producer', update: jest.fn() };
      const updatedPayload = { name: 'Updated Test Producer' };

      jest
        .spyOn(producerRepository, 'findById')
        .mockResolvedValue(mockProducer as any);
      jest
        .spyOn(producerRepository, 'update')
        .mockResolvedValue(mockProducer as any);

      const result = await useCase.execute(updatedPayload as any, id);

      expect(producerRepository.findById).toHaveBeenCalledWith(id);
      expect(mockProducer.update).toHaveBeenCalledWith(updatedPayload);
      expect(producerRepository.update).toHaveBeenCalledWith(mockProducer);
      expect(result).toEqual(mockProducer);
    });

    it('should throw a NotFoundException if Producer is not found', async () => {
      const id = 'non-existing-id';
      const updatedPayload = { name: 'Updated Test Producer' };

      jest.spyOn(producerRepository, 'findById').mockResolvedValue(null);

      await expect(useCase.execute(updatedPayload as any, id)).rejects.toThrow(
        NotFoundException,
      );
      expect(producerRepository.findById).toHaveBeenCalledWith(id);
    });
  });
});
