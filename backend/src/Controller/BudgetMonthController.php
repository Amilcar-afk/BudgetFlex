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
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/budget/month')]
class BudgetMonthController extends AbstractController
{
    private CsrfTokenManagerInterface $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    #[Route('/', name: 'app_budget_month_index', methods: ['GET'])]
    public function index(BudgetMonthRepository $budgetMonthRepository, SerializerInterface $serializer): Response
    {
        $budgetMonths = $budgetMonthRepository->findAll();
        $json = $serializer->serialize($budgetMonths, 'json', ['groups' => 'budget_basic']);

        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/new', name: 'app_budget_month_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        if ($request->isMethod('GET')) {
            $budgetMonth = new BudgetMonth();
            $form = $this->createForm(BudgetMonthType::class, $budgetMonth);

            return $this->render('budget_month/new.html.twig', [
                'budget_month' => $budgetMonth,
                'form' => $form->createView(),
            ]);
        }

        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            return new JsonResponse(['error' => 'Invalid JSON data'], 400);
        }

        $budgetMonth = new BudgetMonth();
        $form = $this->createForm(BudgetMonthType::class, $budgetMonth);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($budgetMonth);
            $entityManager->flush();

            $json = $serializer->serialize($budgetMonth, 'json', ['groups' => 'budget_basic']);

            return new Response($json, 201, ['Content-Type' => 'application/json']);
        }

        return new JsonResponse(['error' => 'Invalid form data'], 400);
    }

    #[Route('/{id}', name: 'app_budget_month_show', methods: ['GET'])]
    public function show(BudgetMonth $budgetMonth, SerializerInterface $serializer): Response
    {
        $json = $serializer->serialize($budgetMonth, 'json', ['groups' => 'budget_basic']);

        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}/edit', name: 'app_budget_month_edit', methods: ['PUT'])]
    public function edit(Request $request, BudgetMonth $budgetMonth, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(BudgetMonthType::class, $budgetMonth);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            $json = $serializer->serialize($budgetMonth, 'json', ['groups' => 'budget_basic']);

            return new Response($json, 200, ['Content-Type' => 'application/json']);
        }

        return new Response(null, 400);
    }

    #[Route('/{id}', name: 'app_budget_month_delete', methods: ['DELETE'])]
    public function delete(Request $request, BudgetMonth $budgetMonth, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new Response('Invalid JSON data', 400);
        }

        if (!isset($data['_token'])) {
            return new Response('CSRF token missing', 400);
        }

        $isValidToken = $this->isCsrfTokenValid('delete_budget_month' . $budgetMonth->getId(), $data['_token']);
        if (!$isValidToken) {
            return new Response('Invalid CSRF token', 400);
        }

        $entityManager->remove($budgetMonth);
        $entityManager->flush();

        return new Response(null, 204);
    }
}
