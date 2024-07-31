<?php

namespace App\Controller;

use App\Entity\BudgetMonth;
use App\Entity\User;
use App\Form\BudgetMonthType;
use App\Repository\BudgetMonthRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/budget/month')]
class BudgetMonthController extends AbstractController
{
    #[Route('/', name: 'app_budget_month_index', methods: ['GET'])]
    public function index(BudgetMonthRepository $budgetMonthRepository, SerializerInterface $serializer): JsonResponse
    {
        $budgetMonths = $budgetMonthRepository->findAll();
        $data = $serializer->serialize($budgetMonths, 'json', ['groups' => 'budget_list']);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/new', name: 'app_budget_month_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $budgetMonth = new BudgetMonth();
        $budgetMonth->setYear($data['year']);
        $budgetMonth->setMonth($data['month']);
        $budgetMonth->setInitialBudget($data['initialBudget']);
        $budgetMonth->setState($data['state']);

        $user = $entityManager->getRepository(User::class)->find($data['user']);
        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
        $budgetMonth->setUserId($user);

        $entityManager->persist($budgetMonth);
        $entityManager->flush();
        $responseData = $serializer->serialize($budgetMonth, 'json', ['groups' => 'budget_details']);

        return new JsonResponse($responseData, Response::HTTP_CREATED, [], true);
    }

    #[Route('/{id}', name: 'app_budget_month_show', methods: ['GET'])]
    public function show(BudgetMonth $budgetMonth, SerializerInterface $serializer): JsonResponse
    {

        $user = $this->getUser();

        // Débogage : afficher les informations de l'utilisateur et de l'entité
        dump($user);
        dump($budgetMonth->getUserId());

        if (!$this->getUser()) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        $this->denyAccessUnlessGranted('view', $budgetMonth);

        $data = $serializer->serialize($budgetMonth, 'json', ['groups' => 'budget_details']);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}/edit', name: 'app_budget_month_edit', methods: ['PUT'])]
    public function edit(Request $request, BudgetMonth $budgetMonth, EntityManagerInterface $entityManager): JsonResponse
    {

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        if (isset($data['year'])) {
            $budgetMonth->setYear($data['year']);
        }
        if (isset($data['month'])) {
            $budgetMonth->setMonth($data['month']);
        }
        if (isset($data['initialBudget'])) {
            $budgetMonth->setInitialBudget($data['initialBudget']);
        }
        if (isset($data['state'])) {
            $budgetMonth->setState($data['state']);
        }
        if (isset($data['user'])) {
            $user = $entityManager->getRepository(User::class)->find($data['user']);
            if ($user) {
                $budgetMonth->setUserId($user);
            } else {
                return new JsonResponse(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
            }
        }

        $entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    /*#[Route('/{id}', name: 'app_budget_month_delete', methods: ['POST'])]
    public function delete(BudgetMonth $budgetMonth, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($budgetMonth);
        $entityManager->flush();

        return $this->redirectToRoute('app_budget_month_index', [], Response::HTTP_SEE_OTHER);
    }*/
}
