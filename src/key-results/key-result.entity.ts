import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ nullable: true, type: 'varchar', length: 50 })
  status: string;

  @Column({ nullable: true, type: 'int' })
  initial_value: number;

  @Column({ nullable: true, type: 'int' })
  goal_value: number;

  @Column({ nullable: true, type: 'varchar', length: 120 })
  comment: string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, (owner) => owner.key_results, {
    eager: true,
  })
  owner: User;

  @OneToMany(() => Objective, (objective) => objective.key_results)
  objectives: Objective[];

  @OneToMany(() => Checkin, (checkin) => checkin.key_results)
  checkin: Checkin[];
}

