<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FormRepository")
 */
class Form
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message = "Merci de bien vouloir saisir votre nom !")
     * @Assert\Length(min = 3, minMessage = "Votre nom doit contenir au moins {{ limit }} caractères !", max = 30, maxMessage = "Votre nom doit faire moins de {{ limit }} caractères !" ) 
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message = "Merci de bien vouloir saisir l'objet de votre question !")
     */
    private $object;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Regex(pattern = "/^([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})$/", message="{{ value }} n'est pas un numéro de téléphone valide !")
     *
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Email(message = "{{ value }} n'est pas une adresse mail valide !")
     */
    private $mail;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message = "Merci de bien vouloir saisir votre question !")
     * @Assert\Length(min = 10, minMessage = "Votre question doit contenir au moins {{ limit }} caractères !", max = 10000, maxMessage = "Votre question doit faire moins de {{ limit }} caractères !" ) 
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getObject(): ?string
    {
        return $this->object;
    }

    public function setObject(string $object): self
    {
        $this->object = $object;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(?string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
