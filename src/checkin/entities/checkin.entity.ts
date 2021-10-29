import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique([])
export class Objective extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ChekingId: number;

  @Column({ nullable: false, type: 'varchar', length: 120 })
  krId: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  status: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  Date: string;
}
