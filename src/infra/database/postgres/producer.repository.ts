import { Producer } from '../../../domain/entities/producer';
import { IProducerRepository } from '../interfaces/producer-repository.interface';

export class TypeOrmProducerRepository implements IProducerRepository {
  private _mockDataBase = [];

  insert(entity: Producer): Promise<Producer> {
    this._mockDataBase.push(entity);
    return Promise.resolve(entity);
  }
  update(entity: Producer): Promise<Producer | null> {
    const index = this._mockDataBase.findIndex(
      (databaseEntity) => databaseEntity.id === entity.id,
    );

    this._mockDataBase[index] = entity;

    return Promise.resolve(entity);
  }
  find(filter: Record<string, any>): Promise<[Producer[], number]> {
    return Promise.resolve([this._mockDataBase, this._mockDataBase.length]);
  }
  findById(id: string): Promise<Producer | null> {
    const entity = this._mockDataBase.find((entity) => entity.id === id);

    if (!entity) return Promise.resolve(null);

    return Promise.resolve(entity);
  }
  delete(id: string): Promise<void> {
    const index = this._mockDataBase.findIndex(
      (databaseEntity) => databaseEntity.id === id,
    );

    this._mockDataBase.splice(index, 1);
    return Promise.resolve();
  }
}
