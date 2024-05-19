import { Entity, Column } from 'typeorm';

@Entity({ name: 'producers' })
export class ProducerTypeOrmEntity {
  @Column({ type: 'varchar', length: 100, primary: true, unique: true })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  document: string;

  @Column({ type: 'varchar', length: 100 })
  producer_name: string;

  @Column({ type: 'varchar', length: 100 })
  farm_name: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'int' })
  total_area: number;

  @Column({ type: 'int' })
  arable_area: number;

  @Column({ type: 'int' })
  vegetation_area: number;

  @Column('varchar', { array: true })
  plantation: string[];

  @Column({ type: 'timestamp' })
  created_at?: Date;

  @Column({ type: 'timestamp' })
  updated_at?: Date;
}
