import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Sections } from '../../section/entities/section.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Polls extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isPublic: boolean;

  @OneToMany(() => Sections, (section) => section.poll)
  sections?: Sections[] | null;

  @Column({ nullable: false })
  ownerId: number;

  @OneToOne(() => User, {
    eager: false,
  })
  @JoinColumn()
  owner?: User | null;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
