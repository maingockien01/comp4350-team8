import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1710869453262 implements MigrationInterface {
    name = 'Init1710869453262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`location\` (
                \`lid\` int NOT NULL AUTO_INCREMENT,
                \`building\` varchar(255) NOT NULL,
                \`roomNumber\` int NOT NULL,
                PRIMARY KEY (\`lid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`term\` (
                \`tid\` int NOT NULL AUTO_INCREMENT,
                \`year\` int NOT NULL,
                \`season\` varchar(255) NOT NULL,
                PRIMARY KEY (\`tid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`section\` (
                \`sid\` int NOT NULL AUTO_INCREMENT,
                \`sectionName\` varchar(255) NOT NULL,
                \`locationID\` int NOT NULL,
                \`tid\` int NOT NULL,
                \`time\` varchar(255) NOT NULL,
                \`cid\` int NOT NULL,
                \`professor\` varchar(255) NOT NULL,
                \`courseCid\` int NULL,
                \`termTid\` int NULL,
                \`locationLid\` int NULL,
                PRIMARY KEY (\`sid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`course\` (
                \`cid\` int NOT NULL AUTO_INCREMENT,
                \`courseName\` varchar(255) NOT NULL,
                \`department\` varchar(255) NOT NULL,
                \`courseNumber\` int NOT NULL,
                \`description\` varchar(255) NOT NULL,
                PRIMARY KEY (\`cid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`degree\` (
                \`did\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`did\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`uid\` int NOT NULL AUTO_INCREMENT,
                \`fullName\` varchar(255) NOT NULL,
                \`username\` varchar(255) NOT NULL,
                \`hashPassword\` varchar(255) NOT NULL,
                \`did\` int NOT NULL,
                \`pictureProfile\` varchar(255) NOT NULL,
                \`degreeDid\` int NULL,
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`term_courses_course\` (
                \`termTid\` int NOT NULL,
                \`courseCid\` int NOT NULL,
                INDEX \`IDX_24214a3ff315538eb189ab9b30\` (\`termTid\`),
                INDEX \`IDX_8c56088487cbb9a327553bcf1c\` (\`courseCid\`),
                PRIMARY KEY (\`termTid\`, \`courseCid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`section_users_user\` (
                \`sectionSid\` int NOT NULL,
                \`userUid\` int NOT NULL,
                INDEX \`IDX_de9b34bed2d4f8194bf7096599\` (\`sectionSid\`),
                INDEX \`IDX_326bc3f49586889d11ebb416a1\` (\`userUid\`),
                PRIMARY KEY (\`sectionSid\`, \`userUid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`course_users_user\` (
                \`courseCid\` int NOT NULL,
                \`userUid\` int NOT NULL,
                INDEX \`IDX_4f23b84c2b4a1f940b157843c6\` (\`courseCid\`),
                INDEX \`IDX_c3d538188e6420a9eeb9dface0\` (\`userUid\`),
                PRIMARY KEY (\`courseCid\`, \`userUid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`degree_courses_course\` (
                \`degreeDid\` int NOT NULL,
                \`courseCid\` int NOT NULL,
                INDEX \`IDX_3e872ed9032176d9c5ceccb6e2\` (\`degreeDid\`),
                INDEX \`IDX_076a60ac7e2b869577e9a436a7\` (\`courseCid\`),
                PRIMARY KEY (\`degreeDid\`, \`courseCid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_courses_course\` (
                \`userUid\` int NOT NULL,
                \`courseCid\` int NOT NULL,
                INDEX \`IDX_247ca206304156f78bfbeb012c\` (\`userUid\`),
                INDEX \`IDX_49c9b1d3e9f4f840a4ce500d29\` (\`courseCid\`),
                PRIMARY KEY (\`userUid\`, \`courseCid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_sections_section\` (
                \`userUid\` int NOT NULL,
                \`sectionSid\` int NOT NULL,
                INDEX \`IDX_823739ebfbd734e7997bd418b1\` (\`userUid\`),
                INDEX \`IDX_81342059bf40a8ecfa14ef8fab\` (\`sectionSid\`),
                PRIMARY KEY (\`userUid\`, \`sectionSid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`section\`
            ADD CONSTRAINT \`FK_22b959d6614cc54a50da2f1abd8\` FOREIGN KEY (\`courseCid\`) REFERENCES \`course\`(\`cid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`section\`
            ADD CONSTRAINT \`FK_562930a1f56e5f5f569f0f0b609\` FOREIGN KEY (\`termTid\`) REFERENCES \`term\`(\`tid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`section\`
            ADD CONSTRAINT \`FK_ba428db30d43c3827ff8eb22e0d\` FOREIGN KEY (\`locationLid\`) REFERENCES \`location\`(\`lid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD CONSTRAINT \`FK_562060e41ead9bb1b14747cf83d\` FOREIGN KEY (\`degreeDid\`) REFERENCES \`degree\`(\`did\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`term_courses_course\`
            ADD CONSTRAINT \`FK_24214a3ff315538eb189ab9b308\` FOREIGN KEY (\`termTid\`) REFERENCES \`term\`(\`tid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`term_courses_course\`
            ADD CONSTRAINT \`FK_8c56088487cbb9a327553bcf1c1\` FOREIGN KEY (\`courseCid\`) REFERENCES \`course\`(\`cid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`section_users_user\`
            ADD CONSTRAINT \`FK_de9b34bed2d4f8194bf7096599e\` FOREIGN KEY (\`sectionSid\`) REFERENCES \`section\`(\`sid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`section_users_user\`
            ADD CONSTRAINT \`FK_326bc3f49586889d11ebb416a1e\` FOREIGN KEY (\`userUid\`) REFERENCES \`user\`(\`uid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`course_users_user\`
            ADD CONSTRAINT \`FK_4f23b84c2b4a1f940b157843c6b\` FOREIGN KEY (\`courseCid\`) REFERENCES \`course\`(\`cid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`course_users_user\`
            ADD CONSTRAINT \`FK_c3d538188e6420a9eeb9dface0a\` FOREIGN KEY (\`userUid\`) REFERENCES \`user\`(\`uid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`degree_courses_course\`
            ADD CONSTRAINT \`FK_3e872ed9032176d9c5ceccb6e21\` FOREIGN KEY (\`degreeDid\`) REFERENCES \`degree\`(\`did\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`degree_courses_course\`
            ADD CONSTRAINT \`FK_076a60ac7e2b869577e9a436a77\` FOREIGN KEY (\`courseCid\`) REFERENCES \`course\`(\`cid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_courses_course\`
            ADD CONSTRAINT \`FK_247ca206304156f78bfbeb012c1\` FOREIGN KEY (\`userUid\`) REFERENCES \`user\`(\`uid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_courses_course\`
            ADD CONSTRAINT \`FK_49c9b1d3e9f4f840a4ce500d29c\` FOREIGN KEY (\`courseCid\`) REFERENCES \`course\`(\`cid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_sections_section\`
            ADD CONSTRAINT \`FK_823739ebfbd734e7997bd418b18\` FOREIGN KEY (\`userUid\`) REFERENCES \`user\`(\`uid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_sections_section\`
            ADD CONSTRAINT \`FK_81342059bf40a8ecfa14ef8fabd\` FOREIGN KEY (\`sectionSid\`) REFERENCES \`section\`(\`sid\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_sections_section\` DROP FOREIGN KEY \`FK_81342059bf40a8ecfa14ef8fabd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_sections_section\` DROP FOREIGN KEY \`FK_823739ebfbd734e7997bd418b18\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_courses_course\` DROP FOREIGN KEY \`FK_49c9b1d3e9f4f840a4ce500d29c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_courses_course\` DROP FOREIGN KEY \`FK_247ca206304156f78bfbeb012c1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`degree_courses_course\` DROP FOREIGN KEY \`FK_076a60ac7e2b869577e9a436a77\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`degree_courses_course\` DROP FOREIGN KEY \`FK_3e872ed9032176d9c5ceccb6e21\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`course_users_user\` DROP FOREIGN KEY \`FK_c3d538188e6420a9eeb9dface0a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`course_users_user\` DROP FOREIGN KEY \`FK_4f23b84c2b4a1f940b157843c6b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`section_users_user\` DROP FOREIGN KEY \`FK_326bc3f49586889d11ebb416a1e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`section_users_user\` DROP FOREIGN KEY \`FK_de9b34bed2d4f8194bf7096599e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`term_courses_course\` DROP FOREIGN KEY \`FK_8c56088487cbb9a327553bcf1c1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`term_courses_course\` DROP FOREIGN KEY \`FK_24214a3ff315538eb189ab9b308\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_562060e41ead9bb1b14747cf83d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_ba428db30d43c3827ff8eb22e0d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_562930a1f56e5f5f569f0f0b609\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_22b959d6614cc54a50da2f1abd8\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_81342059bf40a8ecfa14ef8fab\` ON \`user_sections_section\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_823739ebfbd734e7997bd418b1\` ON \`user_sections_section\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_sections_section\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_49c9b1d3e9f4f840a4ce500d29\` ON \`user_courses_course\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_247ca206304156f78bfbeb012c\` ON \`user_courses_course\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_courses_course\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_076a60ac7e2b869577e9a436a7\` ON \`degree_courses_course\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_3e872ed9032176d9c5ceccb6e2\` ON \`degree_courses_course\`
        `);
        await queryRunner.query(`
            DROP TABLE \`degree_courses_course\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_c3d538188e6420a9eeb9dface0\` ON \`course_users_user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_4f23b84c2b4a1f940b157843c6\` ON \`course_users_user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`course_users_user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_326bc3f49586889d11ebb416a1\` ON \`section_users_user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_de9b34bed2d4f8194bf7096599\` ON \`section_users_user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`section_users_user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_8c56088487cbb9a327553bcf1c\` ON \`term_courses_course\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_24214a3ff315538eb189ab9b30\` ON \`term_courses_course\`
        `);
        await queryRunner.query(`
            DROP TABLE \`term_courses_course\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`degree\`
        `);
        await queryRunner.query(`
            DROP TABLE \`course\`
        `);
        await queryRunner.query(`
            DROP TABLE \`section\`
        `);
        await queryRunner.query(`
            DROP TABLE \`term\`
        `);
        await queryRunner.query(`
            DROP TABLE \`location\`
        `);
    }

}
