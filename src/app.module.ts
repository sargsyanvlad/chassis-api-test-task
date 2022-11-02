import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import { AnswerModule } from './answer/answer.module';
import { SectionModule } from './section/section.module';
import { QuestionModule } from './question/question.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UsersModule,
    PollModule,
    AnswerModule,
    SectionModule,
    QuestionModule,
    AuthModule,
    AuthGoogleModule,
  ],
})
export class AppModule {}
