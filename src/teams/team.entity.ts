import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['id'])
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID' })
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @ApiProperty({ description: 'Times da empresa' })
  team: string;

  @ManyToMany(() => User, (users) => users.team, {
    cascade: true,
  })
  @ApiProperty({ description: 'Usuários de cada time' })
  users: User[];

  @ManyToOne(() => Objective, (objectives) => objectives.team, {
    cascade: true,
  })
  @ApiProperty({ description: 'Objetivos de cada time' })
  objectives: Objective[];
}
