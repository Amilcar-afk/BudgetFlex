<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HelloWorldController
{
    #[Route('/api/hello', name: 'hello_world')]
    public function helloWorld(): Response
    {
        return new Response('Hello World', Response::HTTP_OK);
    }
}

