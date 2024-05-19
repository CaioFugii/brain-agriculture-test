import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer.entity';
import { BodyUpdateProducerDTO } from '../presentation/http/dto/body-update-producer.dto';

@Injectable()
export class GetByIdProducerUseCase {
  constructor(
    @Inject('ProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(id: string): Promise<Producer> {
    const foundedEntity = await this.producerRepository.findById(id);

    if (!foundedEntity)
      throw new NotFoundException(`Producer ${id} does not exist`);

    return foundedEntity;
  }
}
