import { Producer } from '../../../domain/entities/producer';
import { IProducerRepository } from '../interfaces/producer-repository.interface';

export class TypeOrmProducerRepository implements IProducerRepository {
  private _mockDataBase = [];

  insert(entity: Producer): Promise<Producer> {
    this._mockDataBase.push(entity);
    return Promise.resolve(entity);
  }
  update(entity: Producer): Promise<Producer | null> {
    return Promise.resolve(entity);
  }
  find(filter: Record<string, any>): Promise<[Producer[], number]> {
    return Promise.resolve([this._mockDataBase, this._mockDataBase.length]);
  }
  findById(id: string): Promise<Producer | null> {
    return Promise.resolve(null);
  }
  delete(id: string): Promise<void> {
    return Promise.resolve();
  }
}
