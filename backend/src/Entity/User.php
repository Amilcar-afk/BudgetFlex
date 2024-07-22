<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 60)]
    private ?string $mail = null;

    #[ORM\Column(length: 60)]
    private ?string $lastname = null;

    #[ORM\Column(length: 60)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    /**
     * @var Collection<int, BudgetMonth>
     */
    #[ORM\OneToMany(targetEntity: BudgetMonth::class, mappedBy: 'userId')]
    private Collection $budgetMonths;

    public function __construct()
    {
        $this->budgetMonths = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): static
    {
        $this->mail = $mail;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return Collection<int, BudgetMonth>
     */
    public function getBudgetMonths(): Collection
    {
        return $this->budgetMonths;
    }

    public function addBudgetMonth(BudgetMonth $budgetMonth): static
    {
        if (!$this->budgetMonths->contains($budgetMonth)) {
            $this->budgetMonths->add($budgetMonth);
            $budgetMonth->setUserId($this);
        }

        return $this;
    }

    public function removeBudgetMonth(BudgetMonth $budgetMonth): static
    {
        if ($this->budgetMonths->removeElement($budgetMonth)) {
            // set the owning side to null (unless already changed)
            if ($budgetMonth->getUserId() === $this) {
                $budgetMonth->setUserId(null);
            }
        }

        return $this;
    }
}
