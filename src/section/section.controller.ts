import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { PollService } from '../poll/poll.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { SectionsSchema } from "./schemas/section-schema";
import {UserSchema} from "../users/schema/user-schema";

@ApiTags('Polls')
@Controller({
  path: 'sections',
  version: '1',
})
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    private readonly pollService: PollService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: SectionsSchema
  })
  async create(@Request() request, @Body() createSection: CreateSectionDto) {
    const poll = await this.pollService.findOne({
      id: createSection.pollId,
    });

    if (poll?.ownerId !== request.user.id) {
      return null;
    }

    return this.sectionService.create(createSection);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Request() request,
    @Param('id') id: number,
    @Body() updateSection: UpdateSectionDto,
  ) {
    // note could be implemented with decorators
    const section = await this.sectionService.findBy(id);
    if (section.poll.ownerId === request.user.id) {
      return this.sectionService.update({ id }, updateSection);
    }
    return null;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async remove(@Request() request, @Param('id') id: number) {
    // note could be implemented with decorators
    const section = await this.sectionService.findBy(id);
    if (section.poll.ownerId === request.user.id) {
      return this.sectionService.delete({ id });
    }
    return null;
  }

  @Get('poll/:pollId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    type: SectionsSchema,
    isArray: true,
  })
  async getByPollId(
    @Param('pollId') pollId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return infinityPagination(
      await this.sectionService.findManyWithPaginationBy(pollId, {
        page,
        limit,
      }),
      { page, limit },
    );
  }
}
