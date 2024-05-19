import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProducerRepository } from '../infra/database/interfaces/producer-repository.interface';
import { Producer } from '../domain/entities/producer.entity';
import { GetProducersParamsDTO } from '../presentation/http/dto/get-producers.dto';

@Injectable()
export class GetProducersUseCase {
  constructor(
    @Inject('ProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(params: GetProducersParamsDTO): Promise<[Producer[], number]> {
    const searchParams = {
      pageNumber: params.pageNumber ?? 1,
      pageSize: params.pageSize ?? 10,
      orderBy: params.orderBy ?? 'created_at',
      order: params.order ?? 'DESC',
      city: params.city ?? null,
      state: params.state ?? null,
    };

    return await this.producerRepository.find(searchParams);
  }
}
