import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class KeyResult extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 120 })
  key_result: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  frequency: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  owner: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  rating: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  status: string;

  @Column({ nullable: true, type: 'int' })
  initial_value: number;

  @Column({ nullable: true, type: 'int' })
  goal_value: number;

  @Column({ nullable: true, type: 'varchar', length: 120 })
  comment: string;
}
