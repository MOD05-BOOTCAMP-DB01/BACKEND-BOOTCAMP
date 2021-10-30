import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
@Unique(['id'])
export class Objective extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 120 })
  objective: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  initial_date: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  end_date: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  area: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  unity: string;

  @ManyToOne(() => User, (user) => user.objectives)
  owner: User;
}
