<?php

namespace App\Controller;

use App\Entity\BudgetMonth;
use App\Form\BudgetMonthType;
use App\Repository\BudgetMonthRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/budget/month')]
class BudgetMonthController extends AbstractController
{
    #[Route('/', name: 'app_budget_month_index', methods: ['GET'])]
    public function index(BudgetMonthRepository $budgetMonthRepository): JsonResponse
    {
        return new JsonResponse(['budget_months' => $budgetMonthRepository->findAll()], Response::HTTP_OK);
    }

    #[Route('/new', name: 'app_budget_month_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $budgetMonth = new BudgetMonth();
        $form = $this->createForm(BudgetMonthType::class, $budgetMonth);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($budgetMonth);
            $entityManager->flush();

            return $this->redirectToRoute('app_budget_month_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('budget_month/new.html.twig', [
            'budget_month' => $budgetMonth,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_budget_month_show', methods: ['GET'])]
    public function show(BudgetMonth $budgetMonth): Response
    {
        return $this->render('budget_month/show.html.twig', [
            'budget_month' => $budgetMonth,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_budget_month_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, BudgetMonth $budgetMonth, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(BudgetMonthType::class, $budgetMonth);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_budget_month_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('budget_month/edit.html.twig', [
            'budget_month' => $budgetMonth,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_budget_month_delete', methods: ['POST'])]
    public function delete(Request $request, BudgetMonth $budgetMonth, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$budgetMonth->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($budgetMonth);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_budget_month_index', [], Response::HTTP_SEE_OTHER);
    }
}
