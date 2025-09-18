"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1757676252297 = void 0;
class Init1757676252297 {
    constructor() {
        this.name = 'Init1757676252297';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "profiles"`);
        await queryRunner.query(`CREATE TABLE "profiles"."work_experiences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "resume_id" character varying NOT NULL, "company" character varying NOT NULL, "title" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date, "description" text, CONSTRAINT "PK_3189db15aaccc2861851ea3da17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles"."resumes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "profile_id" character varying NOT NULL, "resume_path" character varying NOT NULL, CONSTRAINT "PK_9c8677802096d6baece48429d2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles"."educations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "resume_id" character varying NOT NULL, "institution" character varying NOT NULL, "degree" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date, CONSTRAINT "PK_09d2f29e7f6f31f5c01d79d2dbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles"."job_seeker_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "full_name" character varying NOT NULL, CONSTRAINT "PK_9fabb6759237da3f1b8640bafa4" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "profiles"."job_seeker_profiles"`);
        await queryRunner.query(`DROP TABLE "profiles"."educations"`);
        await queryRunner.query(`DROP TABLE "profiles"."resumes"`);
        await queryRunner.query(`DROP TABLE "profiles"."work_experiences"`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS "profiles"`);
    }
}
exports.Init1757676252297 = Init1757676252297;
