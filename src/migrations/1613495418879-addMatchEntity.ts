import {MigrationInterface, QueryRunner} from "typeorm";

export class addMatchEntity1613495418879 implements MigrationInterface {
    name = 'addMatchEntity1613495418879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "match"`);
    }

}
