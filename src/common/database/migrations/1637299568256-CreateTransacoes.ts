import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransacoes1637299568256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE transacoes (
        id INT(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        idConta INT(8) NOT NULL,
        valor NUMERIC(9, 2),
        tipoTransacao enum('deposito', 'saque') NOT NULL,
        dataTransacao TIMESTAMP DEFAULT CURRENT_TIME,

        FOREIGN KEY (idConta)
        REFERENCES contas(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE transacoes
    `);
  }
}
