import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from '../../../domain/entities/producer.entity';
import {
  IProducerRepository,
  ProducerSearchParams,
} from '../interfaces/producer-repository.interface';
import { ILike, Repository } from 'typeorm';
import { ProducerTypeOrmEntity } from './typeorm/producer.entity';
import { DomainError } from '../../../commons/application/exceptions/exception';
import { TypeOrmProducerMapper } from '../mappers/producer.mapper';

export class TypeOrmProducerRepository implements IProducerRepository {
  constructor(
    @InjectRepository(ProducerTypeOrmEntity)
    private readonly repository: Repository<ProducerTypeOrmEntity>,
  ) {}

  async insert(entity: Producer): Promise<Producer> {
    try {
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(ProducerTypeOrmEntity)
        .values([entity.toJSON()])
        .execute();

      return entity;
    } catch (error) {
      throw new DomainError(
        `Something wrong with database, error: ${error?.message}`,
        500,
      );
    }
  }
  async update(entity: Producer): Promise<Producer | null> {
    try {
      await this.repository
        .createQueryBuilder()
        .update(ProducerTypeOrmEntity, entity.toJSON())
        .where('id = :id', { id: entity.id })
        .execute();

      return entity;
    } catch (error) {
      throw new DomainError(
        `Something wrong with database, error: ${error?.message}`,
        500,
      );
    }
  }
  async find(filter: ProducerSearchParams): Promise<[Producer[], number]> {
    try {
      const query: Record<string, any> = {};

      if (filter?.city) {
        query.city = ILike(`%${filter?.city}%`);
      }

      if (filter?.state) {
        query.state = ILike(`%${filter?.state}%`);
      }

      const [entities, count] = await Promise.all([
        this.repository.find({
          where: query,
          order: {
            [filter.orderBy]: filter.order?.toUpperCase(),
          },
          skip: filter.pageSize * (filter.pageNumber - 1),
          take: filter.pageSize,
        }),
        this.repository.count({ where: query }),
      ]);
      return [entities.map(TypeOrmProducerMapper.toEntity), count];
    } catch (error) {
      throw new DomainError(
        `Something wrong with database, error: ${error?.message}`,
        500,
      );
    }
  }
  async findById(id: string): Promise<Producer | null> {
    try {
      const entity = await this.repository.findOneBy({ id });

      if (!entity) return Promise.resolve(null);

      return TypeOrmProducerMapper.toEntity(entity);
    } catch (error) {
      throw new DomainError(
        `Something wrong with database, error: ${error?.message}`,
        500,
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete({ id });
    } catch (error) {
      throw new DomainError(
        `Something wrong with database, error: ${error?.message}`,
        500,
      );
    }
  }
  async getTotalAreaCount(): Promise<number> {
    try {
      return await this.repository.count();
    } catch (error) {
      throw new DomainError(
        `Something wrong with database, error: ${error?.message}`,
        500,
      );
    }
  }
  async getTotalAreaCountHectares(): Promise<number> {
    try {
      const count = await this.repository
        .createQueryBuilder()
        .select('SUM(total_area)', 'total_area')
        .getRawOne();

      return +count.total_area;
    } catch (error) {
      throw new DomainError(
        `Something wrong with database, error: ${error?.message}`,
        500,
      );
    }
  }
  async getStatsByState(): Promise<{ state: string; count: number }[]> {
    const result = await this.repository
      .createQueryBuilder()
      .select('state', 'state')
      .addSelect('COUNT(id)', 'count')
      .groupBy('state')
      .getRawMany();

    return result.map((result) => ({ ...result, count: +result.count }));
  }
  async getStatsByLandUsage(): Promise<
    { land_usage: string; count: number }[]
  > {
    const [arableArea, vegetationArea] = await Promise.all([
      this.repository
        .createQueryBuilder()
        .select("'Arable Area'", 'land_usage')
        .addSelect('SUM(arable_area)', 'total_area')
        .getRawOne(),
      this.repository
        .createQueryBuilder()
        .select("'Vegetation Area'", 'land_usage')
        .addSelect('SUM(vegetation_area)', 'total_area')
        .getRawOne(),
    ]);

    return [arableArea, vegetationArea].map((result) => ({
      ...result,
      total_area: +result.total_area,
    }));
  }

  async getStatsByPlantation(): Promise<
    { plantation: string; count: number }[]
  > {
    const [soyCount, cornCount, cottonCount, coffeeCount, sugarCaneCount] =
      await Promise.all([
        this.repository
          .createQueryBuilder()
          .where(':value = ANY(plantation)', { value: 'soja' })
          .getCount(),
        this.repository
          .createQueryBuilder()
          .where(':value = ANY(plantation)', { value: 'milho' })
          .getCount(),
        this.repository
          .createQueryBuilder()
          .where(':value = ANY(plantation)', { value: 'algodão' })
          .getCount(),
        this.repository
          .createQueryBuilder()
          .where(':value = ANY(plantation)', { value: 'café' })
          .getCount(),
        this.repository
          .createQueryBuilder()
          .where(':value = ANY(plantation)', { value: 'cana de açúcar' })
          .getCount(),
      ]);

    return [
      { plantation: 'Soja', count: soyCount },
      { plantation: 'Milho', count: cornCount },
      { plantation: 'Algodão', count: cottonCount },
      { plantation: 'Café', count: coffeeCount },
      { plantation: 'Cana de açúcar', count: sugarCaneCount },
    ];
  }
}
