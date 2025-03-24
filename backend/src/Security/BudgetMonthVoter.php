<?php

// src/Security/BudgetMonthVoter.php

namespace App\Security;

use App\Entity\BudgetMonth;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class BudgetMonthVoter extends Voter
{
    const VIEW = 'view';
    const EDIT = 'edit';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        return in_array($attribute, [self::VIEW, self::EDIT])
            && $subject instanceof BudgetMonth;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            error_log("not connected");
            return false;
        }

        if (!$subject instanceof BudgetMonth) {
            error_log("not instancied");
            return false;
        }

        switch ($attribute) {
            case self::VIEW:
                return $this->canView($subject, $user);
            case self::EDIT:
                return $this->canEdit($subject, $user);
        }

        return false;
    }

    private function canView(BudgetMonth $budgetMonth, User $user): bool
    {
        return $budgetMonth->getUserId() === $user;
    }

    private function canEdit(BudgetMonth $budgetMonth, User $user): bool
    {
        return $budgetMonth->getUserId() === $user;
    }
}
