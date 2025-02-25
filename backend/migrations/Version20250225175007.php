<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250225175007 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE budget_month ALTER wants_category DROP DEFAULT');
        $this->addSql('ALTER TABLE budget_month ALTER needs_category DROP DEFAULT');
        $this->addSql('ALTER TABLE budget_month ALTER saving_category DROP DEFAULT');
        $this->addSql("ALTER TABLE expenses ADD sub_category VARCHAR(50) DEFAULT 'loisirs'");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE budget_month ALTER wants_category SET DEFAULT \'0\'');
        $this->addSql('ALTER TABLE budget_month ALTER needs_category SET DEFAULT \'0\'');
        $this->addSql('ALTER TABLE budget_month ALTER saving_category SET DEFAULT \'0\'');
        $this->addSql('ALTER TABLE expenses DROP sub_category');
    }
}
