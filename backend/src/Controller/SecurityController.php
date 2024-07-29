<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    #[Route(path: '/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, AuthenticationUtils $authenticationUtils): JsonResponse
    {
        if (!$request->isMethod('POST')) {
            return new JsonResponse(['message' => 'Method not allowed'], Response::HTTP_METHOD_NOT_ALLOWED);
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $user = $this->getUser();
        //var_dump($error);
        if ($error) {
            return new JsonResponse(['message' => $error], Response::HTTP_UNAUTHORIZED);
        }

        if (!$user) {
            return new JsonResponse(['message' => 'Invalid credentials tmr'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $this->jwtManager->create($user);

        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }

    #[Route('/login_check', name: 'app_login_check', methods: ['POST'])]
    public function loginCheck(): JsonResponse
    {
        // This method can be blank: it's intercepted by the form_login system
        // and does not need to return anything or handle any logic directly.
        // The authentication process is handled by Symfony security.

        return new JsonResponse(['status' => 'authentication process should be handled by Symfony'], 200);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
