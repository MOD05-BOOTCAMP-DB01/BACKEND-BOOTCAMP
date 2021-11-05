import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { KeyResult } from 'src/key-results/key-result.entity';

@Entity()
@Unique(['id'])
export class Checkin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  date: string;

  @Column({ nullable: false, type: 'int' })
  current_value: number;

  @JoinColumn({ name: 'key_result_id' })
  @ManyToOne(() => KeyResult, (key_result) => key_result.checkin)
  key_result: KeyResult;
}
