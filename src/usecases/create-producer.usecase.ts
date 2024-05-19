import { Inject, Injectable } from '@nestjs/common';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer.entity';
import { BodyCreateProducerDTO } from '../presentation/http/dto/body-create-producer.dto';
import { Logger } from '../commons/application/logger/logger';

@Injectable()
export class CreateProducerUseCase {
  constructor(
    @Inject('ProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(payload: BodyCreateProducerDTO): Promise<Producer> {
    const entityToPersist = new Producer(payload);
    return await this.producerRepository.insert(entityToPersist);
  }
}
