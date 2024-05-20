import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerUseCase } from './create-producer.usecase';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer.entity';
import { BodyCreateProducerDTO } from '../presentation/http/dto/body-create-producer.dto';

describe('CreateProducerUseCase', () => {
  let useCase: CreateProducerUseCase;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducerUseCase,
        {
          provide: 'ProducerRepository',
          useValue: {
            insert: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateProducerUseCase>(CreateProducerUseCase);
    producerRepository = module.get<IProducerRepository>('ProducerRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create and insert a new Producer', async () => {
      const payload: BodyCreateProducerDTO = {
        document: '52734151014',
        producer_name: 'Test Producer',
        farm_name: 'Test Farm',
        city: 'Test City',
        state: 'TS',
        total_area: 100,
        arable_area: 70,
        vegetation_area: 30,
        plantation: ['corn', 'soy'],
      };

      const mockProducer = new Producer(payload);
      jest.spyOn(producerRepository, 'insert').mockResolvedValue(mockProducer);

      const result = await useCase.execute(payload);

      expect(result).toEqual(mockProducer);
      expect(producerRepository.insert).toHaveBeenCalledWith(
        expect.any(Producer),
      );
    });

    it('should throw an error if repository insert fails', async () => {
      const payload: BodyCreateProducerDTO = {
        document: '52734151014',
        producer_name: 'Test Producer',
        farm_name: 'Test Farm',
        city: 'Test City',
        state: 'TS',
        total_area: 100,
        arable_area: 70,
        vegetation_area: 30,
        plantation: ['corn', 'soy'],
      };

      const error = new Error('Insert failed');
      jest.spyOn(producerRepository, 'insert').mockRejectedValue(error);

      await expect(useCase.execute(payload)).rejects.toThrow('Insert failed');
      expect(producerRepository.insert).toHaveBeenCalledWith(
        expect.any(Producer),
      );
    });
  });
});
