<?php

namespace App\Controller;

use App\Entity\BudgetMonth;
use App\Entity\Expenses;
use App\Entity\User;
use App\Form\ExpensesType;
use App\Repository\BudgetMonthRepository;
use App\Repository\ExpensesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use DateTime;

#[Route('/expenses')]
class ExpensesController extends AbstractController
{
    /*#[Route('/', name: 'app_expenses_index', methods: ['GET'])]
    public function index(ExpensesRepository $expensesRepository, SerializerInterface $serializer): Response
    {
        if (!$this->getUser()) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        $expenses = $expensesRepository->findAll();
        $data = $serializer->serialize($expenses, 'json', ['groups' => 'expenses_list']);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }*/

    #[Route('/new', name: 'app_expenses_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): jsonResponse
    {
        if (!$this->getUser()) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $expenses = new Expenses();
        $expenses->setPrice($data['price']);
        $expenses->setName($data['name']);
        $expenses->setCategory($data['category']);

        try {
            $date = new DateTime($data['date']);
            $expenses->setDate($date);
        } catch (Exception $e) {
            return new JsonResponse(['error' => 'Invalid date format'], Response::HTTP_BAD_REQUEST);
        }

        $budgetMonth = $entityManager->getRepository(BudgetMonth::class)->find($data['budgetMonth']);
        if (!$budgetMonth) {
            return new JsonResponse(['error' => 'BudgetMonth not found'], Response::HTTP_NOT_FOUND);
        }
        $expenses->setBudgetMonth($budgetMonth);

        $entityManager->persist($expenses);
        $entityManager->flush();
        $responseData = $serializer->serialize($expenses, 'json', ['groups' => 'expenses_list']);

        return new JsonResponse($responseData, Response::HTTP_CREATED, [], true);
    }

    /*#[Route('/{id}', name: 'app_expenses_show', methods: ['GET'])]
    public function show(Expenses $expense): Response
    {
        return $this->render('expenses/show.html.twig', [
            'expense' => $expense,
        ]);
    }*/

    #[Route('/{id}/edit', name: 'app_expenses_edit', methods: ['PUT'])]
    public function edit(Request $request, Expenses $expense, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        $budgetMonth = $expense->getBudgetMonth();
        if ($budgetMonth->getUserId()->getId() !== $user->getId()) {
            throw new AccessDeniedException('You do not have permission to edit this expense.');
        }

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        if (isset($data['name'])) {
            $expense->setName($data['name']);
        }
        if (isset($data['price'])) {
            $expense->setPrice($data['price']);
        }
        if (isset($data['date'])) {
            try {
                $date = new DateTime($data['date']);
                $expense->setDate($date);
            } catch (Exception $e) {
                return new JsonResponse(['error' => 'Invalid date format'], Response::HTTP_BAD_REQUEST);
            }
        }
        if (isset($data['category'])) {
            $expense->setCategory($data['category']);
        }

        $entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}', name: 'app_expenses_delete', methods: ['DELETE'])]
    public function delete(Request $request, Expenses $expense, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        $budgetMonth = $expense->getBudgetMonth();
        if ($budgetMonth->getUserId()->getId() !== $user->getId()) {
            throw new AccessDeniedException('You do not have permission to delete this expense.');
        }

        $entityManager->remove($expense);
        $entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/budget/{budgetMonthId}', name: 'app_expenses_by_budget', methods: ['GET'])]
    public function getExpensesByBudgetMonth(int $budgetMonthId, BudgetMonthRepository $budgetMonthRepository, SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        $budgetMonth = $budgetMonthRepository->find($budgetMonthId);

        if (!$budgetMonth || $budgetMonth->getUserId()->getId() !== $user->getId()) {
            return new JsonResponse(['error' => 'BudgetMonth not found or access denied'], Response::HTTP_NOT_FOUND);
        }

        $expenses = $budgetMonth->getExpenses();
        $data = $serializer->serialize($expenses, 'json', ['groups' => 'expenses_list']);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

}
