<?php

namespace App\Entity;

use App\Repository\BudgetMonthRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BudgetMonthRepository::class)]
class BudgetMonth
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['budget_detail', 'user_overview'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['budget_detail', 'user_overview'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    #[Groups(['budget_detail'])]
    private ?float $initialBudget = null;

    #[ORM\ManyToOne(inversedBy: 'budgetMonths')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['budget_detail'])]
    private ?User $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getInitialBudget(): ?float
    {
        return $this->initialBudget;
    }

    public function setInitialBudget(float $initialBudget): static
    {
        $this->initialBudget = $initialBudget;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
