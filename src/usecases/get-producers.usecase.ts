import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer';
import { GetProducersParamsDTO } from '../presentation/http/dto/get-producers.dto';

@Injectable()
export class GetProducersUseCase {
  constructor(
    @Inject('ProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(params: GetProducersParamsDTO): Promise<[Producer[], number]> {
    return await this.producerRepository.find(params);
  }
}
