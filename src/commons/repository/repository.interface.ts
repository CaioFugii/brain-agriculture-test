import Entity from '../entities/entity';

export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<E>;
  findById(id: string): Promise<E | null>;
  find(filter: Record<string, any>): Promise<[E[], number]>;
  update(entity: E): Promise<E | null>;
  delete(id: string): Promise<void>;
}

export type SortDirection = 'asc' | 'desc';
