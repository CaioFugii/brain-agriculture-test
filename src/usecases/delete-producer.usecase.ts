import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer.entity';

@Injectable()
export class DeleteProducerUseCase {
  constructor(
    @Inject('ProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const foundedEntity = await this.producerRepository.findById(id);

    if (!foundedEntity)
      throw new NotFoundException(`Producer ${id} does not exist`);

    await this.producerRepository.delete(id);
  }
}
