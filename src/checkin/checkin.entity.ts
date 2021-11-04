import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { KeyResult } from 'src/key-results/key-result.entity';

@Entity()
@Unique(['id'])
export class Checkin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  status: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  date: string;

  @JoinColumn({ name: 'key_result_id' })
  @OneToOne(() => KeyResult, (key_results) => key_results.checkin, {
    eager: true,
  })
  key_results: KeyResult;
}

  
