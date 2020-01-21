// Gestion des accordéons
$(".accordion").click(function() {
    $(this).toggleClass("active");

    if ($(this).next('.panel').css('display') === "block") {
        $(this).next('.panel').css('display', 'none')
    } else {
        $(this).next('.panel').css('display', 'block')
    }
});

// Gestion des liens actifs de la Navbar
$(".nav-link").click(function() {
    $(".nav-item.active").removeClass("active");
    $(this).parent().closest("li").toggleClass("active");
})

// Gestion de l'opacité de la barre de navigation pour les desktops OU repli de la barre de navigation au clic sur un des liens pour les appareils mobiles
if (window.matchMedia("(min-width: 1200px").matches) {
    $(document).scroll(function() {
        if (+$('.navbar').css('opacity') === 1 && !$('.navbar').is(":hover")) {
            $('.navbar').css('opacity', 0)
        }
    })
} else {
    $('.nav-link').bind('click', function() {
        $('#myNavbar').toggleClass('show');
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 'slow');
        return false;
    })
}

// Apparation de la Navbar lorsque l'utilisateur est en haut de page
$(window).scroll(function() {
    if (window.pageYOffset == 0.0)
        $('.navbar').css('opacity', 1)
})

// Apparition de la Navbar lorsque la souris entre dans sa zone
$('.navbar').mouseenter(function() {
    $(this).css('opacity', 1);
})

// Disparition de la Navabr lorsque la souris quitte sa zone (sauf si l'utilisateur se trouve en haut de la page au moment de quitter la zone de la Navbar)
$('.navbar').mouseleave(function() {
    if (window.pageYOffset != 0.0) {
        setTimeout(function() {
            $('.navbar').css('opacity', 0)
        }, 1000)
    }
})

// Gestion de l'écart entre la Navbar et le 1er Jumbotron
$(document).ready(function() {
    let margin = ($('.navbar').height())*2;
    $('#goals').css('margin-top', margin + "px");
    $('#cyberpunk').css('margin-top', margin + "px");
    $('#symreact').css('margin-top', margin + "px");
    $('#monbnb').css('margin-top', margin + "px");
    $('#login-form').css('margin-top', margin + "px");
    $('#messages-page').css('margin-top', margin + "px");

})

// Gestion des cadres "front" et "back" pour les appareils tactiles
$('.flip-card-front').bind('touchstart', function(event) {
    event.stopPropagation();
    event.preventDefault();
    $(this).closest('.flip-card-inner').removeClass('front-is-visible'); 
    $(this).closest('.flip-card-inner').addClass('back-is-visible'); 
})
$('.flip-card-back ul li').bind('touchstart', function(event) {
    event.stopPropagation();
    event.preventDefault();
    $(this).closest('.flip-card-inner').removeClass('back-is-visible');
    $(this).closest('.flip-card-inner').addClass('front-is-visible');
})

// Gestion des "pictures-container" pour les appareils tactiles
$('.picture').bind('touchstart', function() {
    $(this).next('.overlay').toggleClass('text-is-visible');
})

// Gestion du "Bonjour à tous" dynamique (type machine à écrire)
let i = 0;
let text = "Bonjour à toutes et tous !"
$(document).ready(function typeWriter() {
    if (i < text.length) {
        $('.type-writer').append(text.charAt(i));
        i++;
        setTimeout(typeWriter, 100);
    }
})



