import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1604164774154 implements MigrationInterface {
  name = 'CreateUser1604164774154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "polls" ("id" SERIAL NOT NULL, "isPublic" boolean, "ownerId" integer,"deletedAt" TIMESTAMP, CONSTRAINT "PK_poll6a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sections" ("id" SERIAL NOT NULL, "description" character varying, "pollId" integer, "deletedAt" TIMESTAMP, CONSTRAINT "PK_section5a159dd9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question" character varying, "sectionId" integer, "deletedAt" TIMESTAMP, CONSTRAINT "PK_questions5a449fd9f2512dd42373760" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "answers" ("id" SERIAL NOT NULL, "questionId" integer, "answer" character varying, "participantId" integer, "deletedAt" TIMESTAMP, CONSTRAINT "PK_answers5c559ed9f2512dd42373790" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );

    await queryRunner.query(
      `ALTER TABLE "polls" ADD CONSTRAINT "FK_p28e52f758e7bbc53828db92194" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "sections" ADD CONSTRAINT "FK_s28e52f758e7bbc53828db92194" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "questions" ADD CONSTRAINT "FK_q19e52f758e7bbc53828db92194" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "answers" ADD CONSTRAINT "FK_a11e52f758e7bbc53828db92194" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "answers" ADD CONSTRAINT "FK_a_p22e52f758e1bsc53828db92194" FOREIGN KEY ("participantId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_e282acb94d2e3aec10f480e4f6"`);
    await queryRunner.query(`DROP INDEX "IDX_f0e1b4ecdca13b177e2e3a0613"`);
    await queryRunner.query(`DROP INDEX "IDX_58e4dbff0e1a32a9bdc861bb29"`);
    await queryRunner.query(`DROP INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
