import { Producer } from '../../../domain/entities/producer.entity';
import { ProducerTypeOrmEntity } from '../postgres/typeorm/producer.entity';

export class TypeOrmProducerMapper {
  static toEntity(data: ProducerTypeOrmEntity): Producer {
    return new Producer(data, data.id);
  }
}
