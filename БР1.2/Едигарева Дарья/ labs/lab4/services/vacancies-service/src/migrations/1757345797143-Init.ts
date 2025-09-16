import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757345797143 implements MigrationInterface {
    name = 'Init1757345797143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer_profiles" DROP CONSTRAINT "FK_6385f0fa13fabf53036e972d7e8"`);
        await queryRunner.query(`ALTER TABLE "employer_profiles" DROP CONSTRAINT "REL_6385f0fa13fabf53036e972d7e"`);
        await queryRunner.query(`ALTER TABLE "employer_profiles" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employer_profiles" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employer_profiles" ADD CONSTRAINT "REL_6385f0fa13fabf53036e972d7e" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "employer_profiles" ADD CONSTRAINT "FK_6385f0fa13fabf53036e972d7e8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
