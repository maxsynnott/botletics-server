import {MigrationInterface, QueryRunner} from "typeorm";

export class addedM2MUserMatchRelation1613496408284 implements MigrationInterface {
    name = 'addedM2MUserMatchRelation1613496408284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_matches_match" ("userId" integer NOT NULL, "matchId" integer NOT NULL, CONSTRAINT "PK_a44ef18b8b23b45d5a3fe951574" PRIMARY KEY ("userId", "matchId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2fbbed62a45350dbe0015eb115" ON "user_matches_match" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c317816988cc3343c4e36148f7" ON "user_matches_match" ("matchId") `);
        await queryRunner.query(`COMMENT ON COLUMN "game"."history" IS NULL`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "history" SET DEFAULT '{"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}'::text[]`);
        await queryRunner.query(`ALTER TABLE "user_matches_match" ADD CONSTRAINT "FK_2fbbed62a45350dbe0015eb1151" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_matches_match" ADD CONSTRAINT "FK_c317816988cc3343c4e36148f7d" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_matches_match" DROP CONSTRAINT "FK_c317816988cc3343c4e36148f7d"`);
        await queryRunner.query(`ALTER TABLE "user_matches_match" DROP CONSTRAINT "FK_2fbbed62a45350dbe0015eb1151"`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "history" SET DEFAULT '{"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}'`);
        await queryRunner.query(`COMMENT ON COLUMN "game"."history" IS NULL`);
        await queryRunner.query(`DROP INDEX "IDX_c317816988cc3343c4e36148f7"`);
        await queryRunner.query(`DROP INDEX "IDX_2fbbed62a45350dbe0015eb115"`);
        await queryRunner.query(`DROP TABLE "user_matches_match"`);
    }

}
