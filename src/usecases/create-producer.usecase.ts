import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer';

@Injectable()
export class CreateProducerUseCase {
  constructor(
    @Inject('ProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(payload: any): Promise<Producer> {
    return await this.producerRepository.insert(payload);
  }
}
