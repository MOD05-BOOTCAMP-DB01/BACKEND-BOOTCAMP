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
  objectiveId: number;

  @Column({ nullable: false, type: 'varchar', length: 120 })
  objective: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  initialDate: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  endDate: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  area: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  unity: string;
}
