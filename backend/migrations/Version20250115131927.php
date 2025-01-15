<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250115131927 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE budget_month ADD needs_category DOUBLE PRECISION NOT NULL DEFAULT 0');
        $this->addSql('ALTER TABLE budget_month ADD saving_category DOUBLE PRECISION NOT NULL DEFAULT 0');
        $this->addSql('ALTER TABLE budget_month ADD wants_category DOUBLE PRECISION NOT NULL DEFAULT 0');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE budget_month DROP needs_category');
        $this->addSql('ALTER TABLE budget_month DROP saving_category');
        $this->addSql('ALTER TABLE budget_month DROP wants_category');
    }
}
