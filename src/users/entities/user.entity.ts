import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  BaseEntity,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  confirmationEmail: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  confirmationPassword: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  role: string;

  @Column({ nullable: false, type: 'boolean', length: 100, default: false })
  Status: boolean;
}
