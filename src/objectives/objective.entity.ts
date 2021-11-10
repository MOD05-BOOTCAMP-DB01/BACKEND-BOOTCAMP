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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['id'])
export class Objective extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 120 })
  @ApiProperty({description: 'Especificar objetivo'})
  objective: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty({description: 'Tipo de objetivo'})
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  @ApiProperty({description: 'Data inicial'})
  initial_date: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  @ApiProperty({description: 'Data final'})
  end_date: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty()
  area: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty()
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
