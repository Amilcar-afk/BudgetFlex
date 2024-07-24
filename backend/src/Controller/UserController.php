<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

#[Route('/user')]
class UserController extends AbstractController
{

    private CsrfTokenManagerInterface $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    #[Route('/', name: 'user_index', methods: ['GET'])]
    public function index(UserRepository $userRepository, SerializerInterface $serializer): Response
    {
        $users = $userRepository->findAll();
        $json = $serializer->serialize($users, 'json', [AbstractNormalizer::GROUPS => ['user_detail']]);

        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/new', name: 'user_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        if ($request->isMethod('GET')) {
            $user = new User();
            $form = $this->createForm(UserType::class, $user);

            return $this->render('user/new.html.twig', [
                'user' => $user,
                'form' => $form->createView(),
            ]);
        }

        $data = json_decode($request->getContent(), true);
        $user = new User();

        $form = $this->createForm(UserType::class, $user);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($user);
            $entityManager->flush();

            $json = $serializer->serialize($user, 'json');

            return new Response($json, 201, ['Content-Type' => 'application/json']);
        }

        return new Response(null, 400);
    }

    #[Route('/{id}', name: 'user_show', methods: ['GET'])]
    public function show(User $user, SerializerInterface $serializer): Response
    {
        $json = $serializer->serialize($user, 'json', [AbstractNormalizer::GROUPS => ['user_detail']]);

        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}/edit', name: 'user_edit', methods: ['PUT'])]
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(UserType::class, $user);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            $json = $serializer->serialize($user, 'json');

            return new Response($json, 200, ['Content-Type' => 'application/json']);
        }

        return new Response(null, 400);
    }

    #[Route('/{id}', name: 'user_delete', methods: ['DELETE'])]
    public function delete(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new Response('Invalid JSON data', 400);
        }

        if (!isset($data['_token'])) {
            return new Response('CSRF token missing', 400);
        }

        $isValidToken = $this->isCsrfTokenValid('delete_user' . $user->getId(), $data['_token']);
        if (!$isValidToken) {
            return new Response('Invalid CSRF token', 400);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return new Response(null, 204);
    }

    #[Route('/{id}/csrf-token', name: 'user_csrf_token', methods: ['GET'])]
    public function getCsrfTokenForUser(int $id): JsonResponse
    {
        $token = $this->csrfTokenManager->getToken('delete_user' . $id)->getValue();

        return new JsonResponse(['csrfToken' => $token]);
    }
}
