import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1684099042633 implements MigrationInterface {
    name = 'Init1684099042633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "owner_id" uuid, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "refresh_token" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_f2f642257084b8c00e0c270f5e6" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_f2f642257084b8c00e0c270f5e6"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
