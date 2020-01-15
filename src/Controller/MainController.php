<?php

namespace App\Controller;

use App\Entity\Form;
use App\Form\FormType;
use App\Repository\FormRepository;
use DateTime;
use DateTimeZone;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\File\Stream;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index(Request $request, ManagerRegistry $managerRegistry, \Swift_Mailer $mailer)
    {
        $question = new Form();

        $form = $this->createForm(FormType::class, $question);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager = $managerRegistry->getManager();

            $date = new DateTime('now', new DateTimeZone('Europe/Paris'));
            $date->format('d-m-Y H-i');

            $question->setCreatedAt($date);
            
            $manager->persist($question);
            $manager->flush();

            $message = (new \Swift_Message('Nouveau message'))
                    ->setFrom('baptistelise@orange.fr')
                    ->setTo('bidaux.baptiste@orange.fr')
                    ->setBody(
                        $this->renderView('main/email.html.twig', [
                            'data' => $question
                        ]), 
                    'text/html');

            $mailer->send($message);        

            $this->addFlash(
                'success',
                "Votre question a bien été prise en compte. Je m'efforcerai d'y répondre dans les plus brefs délais !"
            );

            return $this->redirectToRoute('homepage', [
                '_fragment' => 'contacts-panel'
            ]);
        }

        return $this->render('main/index.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * Permet à un visteur de télécharger le CV
     *
     * @Route("/download", name="download_file")
     * 
     * @return BinaryFileResponse
     */
    public function sendCv()
    {
        $stream = new Stream('../public/cv/curriculumVitaeBaptisteBidaux.pdf');

        $response = new BinaryFileResponse($stream);

        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, 'curriculumVitaeBaptisteBidaux.pdf');
                 
        return $response;
    }
    
    /**
     * Permet d'afficher des photos du projet Cyberpunk
     * 
     * @Route("/cyberpunk", name="cyberpunk_page")
     *
     * @return Response
     */
    public function cyberpunk() 
    {
        return $this->render('main/cyberpunk.html.twig');
    }

    /**
     * Permet d'afficher des photos du projet SymReact
     * 
     * @Route("/symreact", name="symreact_page")
     *
     * @return Response
     */
    public function symreact() 
    {
        return $this->render('main/symreact.html.twig');
    }

    /**
     * Permet d'afficher des photos du projet MonBnB
     * 
     * @Route("/monbnb", name="monbnb_page")
     *
     * @return Response
     */
    public function monbnb() 
    {
        return $this->render('main/monbnb.html.twig');
    }

    /**
     * Permet d'obtenir la liste des messages envoyés via le formulaire
     *
     * @Route("/messages/{page<\d+>?1}", name="messages_page")
     * 
     * @IsGranted("ROLE_USER")
     * 
     * @return Response
     */
    public function getMessages(FormRepository $repo, $page = 1)
    {
        $this->denyAccessUnlessGranted('ROLE_USER', null, "Un utilisateur a esssayé de se connecter à cette page !");

        
        $limit = 5;
        $offset = $limit * $page - $limit;
        $total = count($repo->findAll());
        $pages = ceil($total / $limit);
        
        $messages = $repo->findBy([], ['id' => 'DESC'], $limit, $offset);

        return $this->render('main/messages.html.twig', [
            'messages' => $messages,
            'page' => $page,
            'pages' => $pages,
            'limit' => $limit
        ]);
    }
}
