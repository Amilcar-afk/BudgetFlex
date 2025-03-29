<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250324150237 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE budget_month_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE expenses_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE budget_month (id INT NOT NULL, user_id_id INT NOT NULL, year VARCHAR(4) NOT NULL, month VARCHAR(20) NOT NULL, initial_budget DOUBLE PRECISION NOT NULL, state VARCHAR(20) NOT NULL, wants_category DOUBLE PRECISION NOT NULL, needs_category DOUBLE PRECISION NOT NULL, saving_category DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E5A785F09D86650F ON budget_month (user_id_id)');
        $this->addSql('CREATE TABLE expenses (id INT NOT NULL, budget_month_id INT NOT NULL, name VARCHAR(150) NOT NULL, price DOUBLE PRECISION NOT NULL, category VARCHAR(50) NOT NULL, sub_category VARCHAR(50) NOT NULL, date DATE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2496F35BDDC3EC40 ON expenses (budget_month_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, firstname VARCHAR(80) NOT NULL, lastname VARCHAR(80) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, is_verified BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON "user" (email)');
        $this->addSql('ALTER TABLE budget_month ADD CONSTRAINT FK_E5A785F09D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE expenses ADD CONSTRAINT FK_2496F35BDDC3EC40 FOREIGN KEY (budget_month_id) REFERENCES budget_month (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE budget_month_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE expenses_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE budget_month DROP CONSTRAINT FK_E5A785F09D86650F');
        $this->addSql('ALTER TABLE expenses DROP CONSTRAINT FK_2496F35BDDC3EC40');
        $this->addSql('DROP TABLE budget_month');
        $this->addSql('DROP TABLE expenses');
        $this->addSql('DROP TABLE "user"');
    }
}
