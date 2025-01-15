<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240912015552 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE expenses_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE expenses (id INT NOT NULL, budget_month_id INT NOT NULL, name VARCHAR(150) NOT NULL, price DOUBLE PRECISION NOT NULL, category VARCHAR(50) NOT NULL, date DATE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2496F35BDDC3EC40 ON expenses (budget_month_id)');
        $this->addSql('ALTER TABLE expenses ADD CONSTRAINT FK_2496F35BDDC3EC40 FOREIGN KEY (budget_month_id) REFERENCES budget_month (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE expenses_id_seq CASCADE');
        $this->addSql('ALTER TABLE expenses DROP CONSTRAINT FK_2496F35BDDC3EC40');
        $this->addSql('DROP TABLE expenses');
    }
}
