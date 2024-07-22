<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240722183415 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE budget_month_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE expenses_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE sub_category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE budget_month (id INT NOT NULL, user_id_id INT NOT NULL, date DATE DEFAULT NULL, initial_budget DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E5A785F09D86650F ON budget_month (user_id_id)');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, name VARCHAR(60) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE expenses (id INT NOT NULL, category_id_id INT NOT NULL, sub_category_id_id INT DEFAULT NULL, name VARCHAR(60) NOT NULL, price DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2496F35B9777D11E ON expenses (category_id_id)');
        $this->addSql('CREATE INDEX IDX_2496F35BF6D3830A ON expenses (sub_category_id_id)');
        $this->addSql('CREATE TABLE sub_category (id INT NOT NULL, name VARCHAR(60) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, mail VARCHAR(60) NOT NULL, lastname VARCHAR(60) NOT NULL, firstname VARCHAR(60) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE budget_month ADD CONSTRAINT FK_E5A785F09D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE expenses ADD CONSTRAINT FK_2496F35B9777D11E FOREIGN KEY (category_id_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE expenses ADD CONSTRAINT FK_2496F35BF6D3830A FOREIGN KEY (sub_category_id_id) REFERENCES sub_category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE budget_month_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE expenses_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE sub_category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE budget_month DROP CONSTRAINT FK_E5A785F09D86650F');
        $this->addSql('ALTER TABLE expenses DROP CONSTRAINT FK_2496F35B9777D11E');
        $this->addSql('ALTER TABLE expenses DROP CONSTRAINT FK_2496F35BF6D3830A');
        $this->addSql('DROP TABLE budget_month');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE expenses');
        $this->addSql('DROP TABLE sub_category');
        $this->addSql('DROP TABLE "user"');
    }
}
