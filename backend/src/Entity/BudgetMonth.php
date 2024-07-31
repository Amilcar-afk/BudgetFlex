<?php

namespace App\Entity;

use App\Repository\BudgetMonthRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: BudgetMonthRepository::class)]
class BudgetMonth
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['budget_details'])]
    private ?int $id = null;

    #[ORM\Column(length: 4)]
    #[Groups(['budget_list', 'budget_details'])]
    private ?string $year = null;

    #[ORM\Column(length: 20)]
    #[Groups(['budget_list', 'budget_details'])]
    private ?string $month = null;

    #[ORM\Column]
    #[Groups(['budget_list', 'budget_details'])]
    private ?float $initialBudget = null;

    #[ORM\Column(length: 20)]
    #[Groups(['budget_list', 'budget_details'])]
    private ?string $state = null;

    #[ORM\ManyToOne(inversedBy: 'budgetMonths')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['budget_details'])]
    private ?User $userId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(string $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getMonth(): ?string
    {
        return $this->month;
    }

    public function setMonth(string $month): static
    {
        $this->month = $month;

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

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): static
    {
        $this->state = $state;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->userId;
    }

    public function setUserId(?User $userId): static
    {
        $this->userId = $userId;

        return $this;
    }
}
