import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';
import { Checkin } from 'src/checkin/checkin.entity';

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
  rating: string;

  @Column({ nullable: true, type: 'int' })
  initial_value: number;

  @Column({ nullable: true, type: 'int' })
  goal_value: number;

  @Column({ nullable: true, type: 'int' })
  status: number;

  @Column({ nullable: true, type: 'varchar', length: 120 })
  comment: string;

  @Column({ nullable: true, type: 'boolean' })
  done: boolean;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, (owner) => owner.key_results, {
    eager: true,
  })
  owner: User;

  @ManyToOne(() => Objective, (objective) => objective.key_results)
  objective: Objective;

  @OneToMany(() => Checkin, (checkin) => checkin.key_result)
  checkin: Checkin[];
}
