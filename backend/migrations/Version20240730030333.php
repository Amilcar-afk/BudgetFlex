<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240730030333 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE budget_month_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE budget_month (id INT NOT NULL, user_id_id INT NOT NULL, year VARCHAR(4) NOT NULL, month VARCHAR(20) NOT NULL, initial_budget DOUBLE PRECISION NOT NULL, state VARCHAR(20) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E5A785F09D86650F ON budget_month (user_id_id)');
        $this->addSql('ALTER TABLE budget_month ADD CONSTRAINT FK_E5A785F09D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE budget_month_id_seq CASCADE');
        $this->addSql('ALTER TABLE budget_month DROP CONSTRAINT FK_E5A785F09D86650F');
        $this->addSql('DROP TABLE budget_month');
    }
}
