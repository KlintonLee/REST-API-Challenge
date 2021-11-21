import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContas1637298520061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE contas (
        id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        idPessoa INT(11) NOT NULL,
        saldo NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
        limiteSaqueDiario NUMERIC(10, 2) NOT NULL,
        flagAtivo BOOLEAN NOT NULL DEFAULT true,
        tipoConta INT(1) NOT NULL,
        dataCriacao TIMESTAMP DEFAULT CURRENT_TIME,

        FOREIGN KEY (idPessoa)
        REFERENCES pessoas(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE contas;
    `);
  }
}
