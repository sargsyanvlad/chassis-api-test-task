import {
  Column,
  Entity,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Polls } from '../../poll/entities/poll.entity';
import { Questions } from '../../question/entities/question.entity';

@Entity()
export class Sections extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  pollId?: number;

  @OneToOne(() => Polls, {
    eager: false,
  })
  @JoinColumn()
  poll?: Polls | null;

  @OneToMany(() => Questions, (question) => question.section)
  questions?: Questions[] | null;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
