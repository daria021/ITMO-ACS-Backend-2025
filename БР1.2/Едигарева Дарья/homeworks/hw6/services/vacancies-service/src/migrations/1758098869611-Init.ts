import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758098869611 implements MigrationInterface {
    name = 'Init1758098869611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "vacancies"`);
        await queryRunner.query(`CREATE TYPE "vacancies"."industry" AS ENUM('technology', 'finance', 'healthcare', 'education', 'manufacturing', 'other')`);
        await queryRunner.query(`CREATE TABLE "vacancies"."companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text, "industry" "vacancies"."industry" NOT NULL DEFAULT 'other', "website" character varying, "address" character varying, "phone" character varying, "email" character varying, "founded_date" date, "employees_count" integer, CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vacancies"."employer_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "phone" character varying NOT NULL, "company_id" uuid NOT NULL, CONSTRAINT "PK_efb68f1f0020cb3b6facedde218" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vacancies"."vacancies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text NOT NULL, "requirements" text, "salary_min" numeric, "salary_max" numeric, "industry" "vacancies"."industry" NOT NULL DEFAULT 'other', "experience_required" integer, "posted_date" TIMESTAMP WITH TIME ZONE NOT NULL, "expire_date" TIMESTAMP WITH TIME ZONE, "company_id" uuid NOT NULL, "employer_profile_id" uuid NOT NULL, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vacancies"."employer_profiles" ADD CONSTRAINT "FK_074b667a0261060b5ce6b2f2db1" FOREIGN KEY ("company_id") REFERENCES "vacancies"."companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancies"."vacancies" ADD CONSTRAINT "FK_053198d00d977357314f47d1cf2" FOREIGN KEY ("company_id") REFERENCES "vacancies"."companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancies"."vacancies" ADD CONSTRAINT "FK_58eea37a911e55f4e8b5867d390" FOREIGN KEY ("employer_profile_id") REFERENCES "vacancies"."employer_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies"."vacancies" DROP CONSTRAINT "FK_58eea37a911e55f4e8b5867d390"`);
        await queryRunner.query(`ALTER TABLE "vacancies"."vacancies" DROP CONSTRAINT "FK_053198d00d977357314f47d1cf2"`);
        await queryRunner.query(`ALTER TABLE "vacancies"."employer_profiles" DROP CONSTRAINT "FK_074b667a0261060b5ce6b2f2db1"`);
        await queryRunner.query(`DROP TABLE "vacancies"."vacancies"`);
        await queryRunner.query(`DROP TABLE "vacancies"."employer_profiles"`);
        await queryRunner.query(`DROP TABLE "vacancies"."companies"`);
        await queryRunner.query(`DROP TYPE "vacancies"."industry"`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS "vacancies"`);
    }

}
