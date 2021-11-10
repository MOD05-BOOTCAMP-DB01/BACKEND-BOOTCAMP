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
import { KeyResult } from 'src/key-results/key-result.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @ApiProperty({ description: 'E-mail do usuário' })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @ApiProperty({ description: 'Nome ou identificação do usuário para acesso' })
  username: string;

  @Column({ nullable: false })
  @ApiProperty({ description: 'Senha do usuário' })
  password: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  @ApiProperty()
  recoverToken: string;

  @Column({ nullable: true })
  @ApiProperty()
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  @ApiProperty({
    enum: ['ADMIN', 'MANAGER', 'USER'],
    description: 'Papel do usuário. Nível de privilégios do utilizador',
  })
  role: string;

  @Column({ nullable: false, default: true })
  @ApiProperty({ description: 'Atividade do usuário' })
  status: boolean;

  @OneToMany(() => Objective, (objectives) => objectives.owner)
  objectives: Objective[];

  @OneToMany(() => KeyResult, (key_results) => key_results.owner)
  key_results: KeyResult[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
