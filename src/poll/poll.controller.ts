import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Request,
  Delete,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { OptionalJwtAuthGuard } from '../auth/auth-guard';
import { FindOptionsWhere } from 'typeorm';
import { Polls } from './entities/poll.entity';
import { UpdatePollDto } from './dto/update-poll.dto';
import {PollSchema} from "./schemas/poll-schema";

@ApiTags('Polls')
@Controller({
  path: 'polls',
  version: '1',
})
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: PollSchema,
  })
  create(@Body() createProfileDto: CreatePollDto, @Request() request) {
    return this.pollService.create(createProfileDto, request.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async findAll(
    @Request() request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    const onlyPublic = !request.user;

    return infinityPagination(
      await this.pollService.findManyWithPagination(
        {
          page,
          limit,
        },
        onlyPublic,
      ),
      { page, limit },
    );
  }

  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Get('me')
  findOne(@Request() request, @Param('id') id: string) {
    const onlyPublic = !request.user;
    const fields: FindOptionsWhere<Polls> = { id: +id };
    if (onlyPublic) {
      fields.isPublic = onlyPublic;
    }
    return this.pollService.findOne(fields);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Get('me')
  update(
    @Request() request,
    @Param('id') id: number,
    @Body() updateProfileDto: UpdatePollDto,
  ) {
    return this.pollService.update(
      { id, ownerId: request.user?.id },
      updateProfileDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Get('me')
  delete(@Request() request, @Param('id') id: number) {
    return this.pollService.delete({ id, ownerId: request.user?.id });
  }
}
