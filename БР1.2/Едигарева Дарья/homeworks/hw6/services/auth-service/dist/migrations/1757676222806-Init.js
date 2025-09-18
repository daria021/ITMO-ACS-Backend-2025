"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1757676222806 = void 0;
class Init1757676222806 {
    constructor() {
        this.name = 'Init1757676222806';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "auth"`);
        await queryRunner.query(`CREATE TYPE "auth"."user_role" AS ENUM('employer', 'jobseeker', 'admin')`);
        await queryRunner.query(`CREATE TABLE "auth"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "role" "auth"."user_role" NOT NULL DEFAULT 'jobseeker', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "auth"."users"`);
        await queryRunner.query(`DROP TYPE "auth"."user_role"`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS "auth"`);
    }
}
exports.Init1757676222806 = Init1757676222806;
