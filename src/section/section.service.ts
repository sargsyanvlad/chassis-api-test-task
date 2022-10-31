import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { Sections } from './entities/section.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Sections)
    private sectionRepository: Repository<Sections>,
  ) {}

  async create(createSection: CreateSectionDto) {
    return this.sectionRepository.save(
      this.sectionRepository.create(createSection),
    );
  }

  update(
    condition: FindOptionsWhere<Sections>,
    fields: QueryDeepPartialEntity<Sections>,
  ) {
    return this.sectionRepository.update(condition, fields);
  }

  findBy(id: number) {
    const options: FindOneOptions = {
      select: {
        id: true,
        description: true,
        poll: {
          ownerId: true,
        },
      },
      relations: ['poll'],
      where: { id },
    };
    return this.sectionRepository.findOne(options);
  }

  delete(condition: FindOptionsWhere<Sections>) {
    return this.sectionRepository.softDelete(condition);
  }

  findManyWithPaginationBy(
    pollId: number,
    paginationOptions: IPaginationOptions,
  ) {
    return this.sectionRepository.find({
      where: { pollId },
      relations: ['questions'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }
}
