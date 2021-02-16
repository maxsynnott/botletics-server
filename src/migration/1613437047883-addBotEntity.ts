import {MigrationInterface, QueryRunner} from "typeorm";

export class addBotEntity1613437047883 implements MigrationInterface {
    name = 'addBotEntity1613437047883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bot" ("id" SERIAL NOT NULL, "endpoint" character varying NOT NULL, "type" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_bc6d59d7870eb2efd5f7f61e5ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bot" ADD CONSTRAINT "FK_21a08745ccbe41631b8fc8d8e7e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bot" DROP CONSTRAINT "FK_21a08745ccbe41631b8fc8d8e7e"`);
        await queryRunner.query(`DROP TABLE "bot"`);
    }

}
