<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240730031122 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE budget_month DROP CONSTRAINT FK_E5A785F09D86650F');
        $this->addSql('DROP INDEX IDX_E5A785F09D86650F');
        $this->addSql('ALTER TABLE budget_month RENAME COLUMN user_id TO user_id_id');
        $this->addSql('ALTER TABLE budget_month ADD CONSTRAINT FK_E5A785F09D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E5A785F09D86650F ON budget_month (user_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE budget_month DROP CONSTRAINT fk_e5a785f09d86650f');
        $this->addSql('DROP INDEX idx_e5a785f09d86650f');
        $this->addSql('ALTER TABLE budget_month RENAME COLUMN user_id_id TO user_id');
        $this->addSql('ALTER TABLE budget_month ADD CONSTRAINT fk_e5a785f09d86650f FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_e5a785f09d86650f ON budget_month (user_id)');
    }
}
