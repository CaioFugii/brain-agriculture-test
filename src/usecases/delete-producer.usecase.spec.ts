import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProducerUseCase } from './delete-producer.usecase';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { NotFoundException } from '@nestjs/common';
import { Producer } from '../domain/entities/producer.entity';

describe('DeleteProducerUseCase', () => {
  let useCase: DeleteProducerUseCase;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProducerUseCase,
        {
          provide: 'ProducerRepository',
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<DeleteProducerUseCase>(DeleteProducerUseCase);
    producerRepository = module.get<IProducerRepository>('ProducerRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should delete an existing Producer', async () => {
      const id = 'existing-id';
      const mockProducer = { name: 'Test Producer' };

      jest
        .spyOn(producerRepository, 'findById')
        .mockResolvedValue(mockProducer as any);
      jest.spyOn(producerRepository, 'delete').mockResolvedValue(undefined);

      await useCase.execute(id);

      expect(producerRepository.findById).toHaveBeenCalledWith(id);
      expect(producerRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if Producer is not found', async () => {
      const id = 'non-existing-id';
      jest.spyOn(producerRepository, 'findById').mockResolvedValue(null);

      await expect(useCase.execute(id)).rejects.toThrow(NotFoundException);
      expect(producerRepository.findById).toHaveBeenCalledWith(id);
      expect(producerRepository.delete).not.toHaveBeenCalled();
    });

    it('should handle repository errors', async () => {
      const id = 'existing-id';
      const mockProducer = { name: 'Test Producer' };
      const error = new Error('Repository error');

      jest
        .spyOn(producerRepository, 'findById')
        .mockResolvedValue(mockProducer as any);
      jest.spyOn(producerRepository, 'delete').mockRejectedValue(error);

      await expect(useCase.execute(id)).rejects.toThrow('Repository error');
      expect(producerRepository.findById).toHaveBeenCalledWith(id);
      expect(producerRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
