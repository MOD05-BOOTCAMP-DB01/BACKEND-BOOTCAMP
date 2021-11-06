import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { KeyResult } from 'src/key-results/key-result.entity';

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

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, (owner) => owner.objectives)
  owner: User;

  @JoinColumn({ name: 'key_result_id' })
  @OneToMany(() => KeyResult, (key_results) => key_results.objective)
  key_results: KeyResult[];

  @JoinColumn({ name: 'objective_related_id' })
  @ManyToMany(
    () => Objective,
    (objective_related) => objective_related.objective,
  )
  objective_related: Objective;
}
