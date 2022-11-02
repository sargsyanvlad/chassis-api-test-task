import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Questions } from '../../question/entities/question.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Answers extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  questionId: number;
  @ManyToOne(() => Questions, {
    eager: false,
  })
  @JoinColumn()
  question?: Questions | null;

  @Column({ nullable: false })
  answer: string;

  @Column({ nullable: true })
  participantId: number;

  @OneToOne(() => User, {
    eager: false,
  })
  @JoinColumn()
  participant?: User | null;
}
