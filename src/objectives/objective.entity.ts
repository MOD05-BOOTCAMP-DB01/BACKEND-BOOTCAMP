import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
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

  @Column({ nullable: true, type: 'varchar', name: 'owner_id' })
  ownerID: string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, (owner) => owner.objectives, {
    eager: true,
  })
  owner: User;
}
