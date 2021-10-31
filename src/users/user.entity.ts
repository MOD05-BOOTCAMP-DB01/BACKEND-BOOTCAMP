import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Objective } from 'src/objectives/objective.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  role: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @OneToMany(() => Objective, (objective) => objective.owner)
  objectives: Objective[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
