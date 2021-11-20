import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePessoas1637298185984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE pessoas (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(50) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        dataNascimento datetime NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE pessoas;
    `);
  }
}
