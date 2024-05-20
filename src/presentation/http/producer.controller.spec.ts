import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { CreateProducerUseCase } from '../../usecases/create-producer.usecase';
import { UpdateProducerUseCase } from '../../usecases/update-producer.usecase';
import { GetByIdProducerUseCase } from '../../usecases/get-by-id-producer.usecase';
import { GetProducersUseCase } from '../../usecases/get-producers.usecase';
import { DeleteProducerUseCase } from '../../usecases/delete-producer.usecase';
import {
  BodyCreateProducerDTO,
  CreateProducerResponseDTO,
} from './dto/body-create-producer.dto';
import {
  BodyUpdateProducerDTO,
  UpdateProducerResponseDTO,
} from './dto/body-update-producer.dto';
import { GetProducersParamsDTO } from './dto/get-producers.dto';
import {
  GetListProducersResponseDTO,
  GetProducerResponseDTO,
} from './dto/get-producer-response.dto';

describe('ProducerController', () => {
  let controller: ProducerController;
  let createProducerUseCase: CreateProducerUseCase;
  let updateProducerUseCase: UpdateProducerUseCase;
  let getByIdProducerUseCase: GetByIdProducerUseCase;
  let getProducersUseCase: GetProducersUseCase;
  let deleteProducerUseCase: DeleteProducerUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: CreateProducerUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateProducerUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetByIdProducerUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetProducersUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteProducerUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
    createProducerUseCase = module.get<CreateProducerUseCase>(
      CreateProducerUseCase,
    );
    updateProducerUseCase = module.get<UpdateProducerUseCase>(
      UpdateProducerUseCase,
    );
    getByIdProducerUseCase = module.get<GetByIdProducerUseCase>(
      GetByIdProducerUseCase,
    );
    getProducersUseCase = module.get<GetProducersUseCase>(GetProducersUseCase);
    deleteProducerUseCase = module.get<DeleteProducerUseCase>(
      DeleteProducerUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new producer', async () => {
      const dto: BodyCreateProducerDTO = {
        document: '52734151014',
        producer_name: 'producer_name',
        farm_name: 'farm_name',
        city: 'city',
        state: 'state',
        total_area: 0,
        arable_area: 0,
        vegetation_area: 0,
        plantation: ['soja'],
      };
      const response = {
        document: '52734151014',
        producer_name: 'producer_name',
        farm_name: 'farm_name',
        city: 'city',
        state: 'state',
        total_area: 0,
        arable_area: 0,
        vegetation_area: 0,
        plantation: ['soja'],
      };
      jest
        .spyOn(createProducerUseCase, 'execute')
        .mockResolvedValue(response as any);

      expect(await controller.create(dto)).toEqual(
        new CreateProducerResponseDTO(dto),
      );
      expect(createProducerUseCase.execute).toHaveBeenCalledWith(dto);
    });

    it('should handle errors', async () => {
      const dto: BodyCreateProducerDTO = {
        document: '52734151014',
        producer_name: 'producer_name',
        farm_name: 'farm_name',
        city: 'city',
        state: 'state',
        total_area: 0,
        arable_area: 0,
        vegetation_area: 0,
        plantation: ['soja'],
      };
      jest
        .spyOn(createProducerUseCase, 'execute')
        .mockRejectedValue(new Error('Error'));

      await expect(controller.create(dto)).rejects.toThrow('Error');
      expect(createProducerUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a producer', async () => {
      const id = '1';
      const dto: BodyUpdateProducerDTO = {
        document: '52734151014',
        producer_name: 'producer_name',
        farm_name: 'farm_name',
        city: 'city',
        state: 'state',
        total_area: 0,
        arable_area: 0,
        vegetation_area: 0,
        plantation: ['soja'],
      };
      const response = {
        document: '52734151014',
        producer_name: 'producer_name',
        farm_name: 'farm_name',
        city: 'city',
        state: 'state',
        total_area: 0,
        arable_area: 0,
        vegetation_area: 0,
        plantation: ['soja'],
      };
      jest
        .spyOn(updateProducerUseCase, 'execute')
        .mockResolvedValue(response as any);

      expect(await controller.update(dto, id)).toEqual(
        new UpdateProducerResponseDTO(response),
      );
      expect(updateProducerUseCase.execute).toHaveBeenCalledWith(dto, id);
    });

    it('should handle errors', async () => {
      const id = '1';
      const dto: BodyUpdateProducerDTO = {
        document: '52734151014',
        producer_name: 'producer_name',
        farm_name: 'farm_name',
        city: 'city',
        state: 'state',
        total_area: 0,
        arable_area: 0,
        vegetation_area: 0,
        plantation: ['soja'],
      };
      jest
        .spyOn(updateProducerUseCase, 'execute')
        .mockRejectedValue(new Error('Error'));

      await expect(controller.update(dto, id)).rejects.toThrow('Error');
      expect(updateProducerUseCase.execute).toHaveBeenCalledWith(dto, id);
    });
  });

  describe('getById', () => {
    it('should get a producer by id', async () => {
      const id = '1';
      const response = {
        id: '874cf522-223f-42a9-9e4f-c8345c39a647',
        document: '12345678910',
        producer_name: 'Tonic Milho producer',
        farm_name: 'Milharal farm',
        city: 'Campinas',
        state: 'São Paulo',
        total_area: 50,
        arable_area: 30,
        vegetation_area: 20,
        plantation: ['Soja', 'Milho', 'Algodão', 'Cana de açúcar'],
      };
      jest
        .spyOn(getByIdProducerUseCase, 'execute')
        .mockResolvedValue(response as any);

      expect(await controller.getById(id)).toEqual(
        new GetProducerResponseDTO(response),
      );
      expect(getByIdProducerUseCase.execute).toHaveBeenCalledWith(id);
    });

    it('should handle errors', async () => {
      const id = '1';
      jest
        .spyOn(getByIdProducerUseCase, 'execute')
        .mockRejectedValue(new Error('Error'));

      await expect(controller.getById(id)).rejects.toThrow('Error');
      expect(getByIdProducerUseCase.execute).toHaveBeenCalledWith(id);
    });
  });

  describe('get', () => {
    it('should get a list of producers', async () => {
      const params: GetProducersParamsDTO = {};
      const response = [
        {
          id: '874cf522-223f-42a9-9e4f-c8345c39a647',
          document: '12345678910',
          producer_name: 'Tonic Milho producer',
          farm_name: 'Milharal farm',
          city: 'Campinas',
          state: 'São Paulo',
          total_area: 50,
          arable_area: 30,
          vegetation_area: 20,
          plantation: ['Soja', 'Milho', 'Algodão', 'Cana de açúcar'],
        },
        1,
      ];
      jest
        .spyOn(getProducersUseCase, 'execute')
        .mockResolvedValue(response as any);

      expect(await controller.get(params)).toEqual(
        new GetListProducersResponseDTO(
          response[0] as any,
          response[1] as any,
          1,
          10,
        ),
      );
      expect(getProducersUseCase.execute).toHaveBeenCalledWith(params);
    });

    it('should handle errors', async () => {
      const params: GetProducersParamsDTO = {};
      jest
        .spyOn(getProducersUseCase, 'execute')
        .mockRejectedValue(new Error('Error'));

      await expect(controller.get(params)).rejects.toThrow('Error');
      expect(getProducersUseCase.execute).toHaveBeenCalledWith(params);
    });
  });

  describe('delete', () => {
    it('should delete a producer by id', async () => {
      const id = '1';
      jest.spyOn(deleteProducerUseCase, 'execute').mockResolvedValue(undefined);

      await expect(controller.delete(id)).resolves.toBeUndefined();
      expect(deleteProducerUseCase.execute).toHaveBeenCalledWith(id);
    });

    it('should handle errors', async () => {
      const id = '1';
      jest
        .spyOn(deleteProducerUseCase, 'execute')
        .mockRejectedValue(new Error('Error'));

      await expect(controller.delete(id)).rejects.toThrow('Error');
      expect(deleteProducerUseCase.execute).toHaveBeenCalledWith(id);
    });
  });
});
