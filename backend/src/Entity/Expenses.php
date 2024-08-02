<?php

namespace App\Entity;

use App\Repository\ExpensesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ExpensesRepository::class)]
class Expenses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['expenses_details'])]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    #[Groups(['expenses_list', 'expenses_details'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['expenses_list', 'expenses_details'])]
    private ?float $price = null;

    #[ORM\Column(length: 50)]
    #[Groups(['expenses_list', 'expenses_details'])]
    private ?string $category = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['expenses_list', 'expenses_details'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\ManyToOne(inversedBy: 'expenses')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['expenses_details'])]
    private ?BudgetMonth $budgetMonth = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;

        return $this;
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

    public function getBudgetMonth(): ?BudgetMonth
    {
        return $this->budgetMonth;
    }

    public function setBudgetMonth(?BudgetMonth $budgetMonth): static
    {
        $this->budgetMonth = $budgetMonth;

        return $this;
    }
}
