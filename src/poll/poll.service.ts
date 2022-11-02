import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  Repository,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { Polls } from './entities/poll.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Polls)
    private pollRepository: Repository<Polls>,
  ) {}

  create(createPoll: CreatePollDto, ownerId: number) {
    return this.pollRepository.save(
      this.pollRepository.create({ ...createPoll, ownerId }),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
    publicOnly: boolean,
  ) {
    const options: FindManyOptions = {
      select: {
        id: true,
        ownerId: true,
        isPublic: true,
        owner: {
          firstName: true,
          lastName: true,
          id: true,
        },
        sections: {
          description: true,
          questions: true,
        },
      },
      relations: ['owner', 'sections', 'sections.questions'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    };
    if (publicOnly) {
      options.where = { isPublic: true };
    }
    return this.pollRepository.find(options);
  }

  findOne(fields: EntityCondition<Polls>) {
    const options: FindOneOptions = {
      select: {
        id: true,
        ownerId: true,
        isPublic: true,
        owner: {
          firstName: true,
          lastName: true,
          id: true,
        },
        sections: {
          description: true,
          questions: true,
        },
      },
      relations: ['owner', 'sections', 'sections.questions'],
      where: { ...fields },
    };
    return this.pollRepository.findOne(options);
  }

  update(
    condition: FindOptionsWhere<Polls>,
    fields: QueryDeepPartialEntity<Polls>,
  ) {
    return this.pollRepository.update(condition, fields);
  }

  delete(condition: FindOptionsWhere<Polls>) {
    return this.pollRepository.delete(condition);
  }
}
