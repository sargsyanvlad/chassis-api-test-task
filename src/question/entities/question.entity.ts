import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Sections } from '../../section/entities/section.entity';
import { Answers } from '../../answer/entities/answer.entity';

@Entity()
export class Questions extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  question: string;

  @Column({ nullable: false })
  sectionId: number;

  @OneToOne(() => Sections, {
    eager: false,
  })
  @JoinColumn()
  section?: Sections | null;

  @OneToMany(() => Answers, (answer) => answer.question)
  answers?: Answers[] | null;
}
