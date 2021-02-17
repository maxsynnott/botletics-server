import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserEntity1613416564481 implements MigrationInterface {
    name = 'addUserEntity1613416564481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "thirdPartyId" character varying NOT NULL, "thirdPartyProvider" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
