import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1566915333950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "writer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_e43f7a41e79384a71f5e201c323" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "detail" text, "page_count" integer NOT NULL, "publisher" character varying NOT NULL, "price" integer NOT NULL, "isbnCode" character varying NOT NULL, "count" integer NOT NULL, "remain" integer NOT NULL, "cover" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "categoryId" uuid, "writerId" uuid, CONSTRAINT "UQ_b27df7eaebd40ea42b7edd240a5" UNIQUE ("isbnCode"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "return" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "userId" uuid, "bookId" uuid, CONSTRAINT "PK_ab657cf909b743629a0a65eee0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userCode" character varying NOT NULL, "nickname" character varying, "fullname" character varying NOT NULL, "userClass" character varying NOT NULL, "age" integer, "tel" character varying NOT NULL, "profilePicture" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "line_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lineid" character varying NOT NULL, "path" character varying, "follow" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "userId" uuid, CONSTRAINT "REL_c54fb1bcd71c24ef625ea801ed" UNIQUE ("userId"), CONSTRAINT "PK_e264954b147300fa1a47b1ae6bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "action" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "job" character varying NOT NULL, "success" boolean NOT NULL, "data" jsonb, "next" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "lineUserId" uuid, CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "invite_role_enum" AS ENUM('admin', 'staff')`);
        await queryRunner.query(`CREATE TABLE "invite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "success" boolean NOT NULL DEFAULT true, "role" "invite_role_enum" NOT NULL DEFAULT 'staff', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "staff_role_enum" AS ENUM('admin', 'staff')`);
        await queryRunner.query(`CREATE TABLE "staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lineid" character varying NOT NULL, "profile_url" character varying NOT NULL, "role" "staff_role_enum" NOT NULL DEFAULT 'staff', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_342665b56520cb2b8670fc2d138" FOREIGN KEY ("writerId") REFERENCES "writer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transection" ADD CONSTRAINT "FK_50f847e0c17b632e2d7c077c6ab" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transection" ADD CONSTRAINT "FK_5e5be2a40d4474e19a867a34462" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "line_user" ADD CONSTRAINT "FK_c54fb1bcd71c24ef625ea801ed3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_595b66f77aded69edf3fd5e40c3" FOREIGN KEY ("lineUserId") REFERENCES "line_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_595b66f77aded69edf3fd5e40c3"`);
        await queryRunner.query(`ALTER TABLE "line_user" DROP CONSTRAINT "FK_c54fb1bcd71c24ef625ea801ed3"`);
        await queryRunner.query(`ALTER TABLE "transection" DROP CONSTRAINT "FK_5e5be2a40d4474e19a867a34462"`);
        await queryRunner.query(`ALTER TABLE "transection" DROP CONSTRAINT "FK_50f847e0c17b632e2d7c077c6ab"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_342665b56520cb2b8670fc2d138"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2"`);
        await queryRunner.query(`DROP TABLE "staff"`);
        await queryRunner.query(`DROP TYPE "staff_role_enum"`);
        await queryRunner.query(`DROP TABLE "invite"`);
        await queryRunner.query(`DROP TYPE "invite_role_enum"`);
        await queryRunner.query(`DROP TABLE "action"`);
        await queryRunner.query(`DROP TABLE "line_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transection"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "writer"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
