import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer.entity';
import { BodyUpdateProducerDTO } from '../presentation/http/dto/body-update-producer.dto';

@Injectable()
export class UpdateProducerUseCase {
  constructor(
    @Inject('ProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(payload: BodyUpdateProducerDTO, id: string): Promise<Producer> {
    const foundedEntity = await this.producerRepository.findById(id);

    if (!foundedEntity)
      throw new NotFoundException(`Producer ${id} does not exist`);

    foundedEntity.update(payload);

    return await this.producerRepository.update(foundedEntity);
  }
}
