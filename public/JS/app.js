// Gestion des accordéons et des chevrons indicatifs
$(".accordion").click(function() {
    $(this).toggleClass("active");

    if ($(this).next('.panel').css('display') === "block") {
        $(this).next('.panel').css('display', 'none') ;
    } else {
        $(this).next('.panel').css('display', 'block');
    }

    if ($(this).find('img[src*="pictures/gifs/arrow-down.gif"]').css('display') === "inline-block") {
        $(this).find('img[src*="pictures/gifs/arrow-down.gif"]').css('display', 'none');
    } else {
        $(this).find('img[src*="pictures/gifs/arrow-down.gif"]').css('display', 'inline-block');
    }
    
    if ($(this).find('img[src*="pictures/gifs/arrow-up.gif"]').css('display') === "inline-block") {
        $(this).find('img[src*="pictures/gifs/arrow-up.gif"]').css('display', 'none');
    } else {
        $(this).find('img[src*="pictures/gifs/arrow-up.gif"]').css('display', 'inline-block');
    }

    inProgress();
});

// Au clic sur un des liens de la Navbar
$(".nav-link").click(function() {
    // Gestion des liens actifs de la Navbar
    $(".nav-item.active").removeClass("active");
    $(this).parent().closest("li").toggleClass("active");

    // Disparition de la Navbar lorsque'on clique sur un de ses liens pour les appareils mobiles (sur les autres, le :hover prend le dessus)
    $('#myNavbar').toggleClass('show');

    // scrolling automatique vers la cible du lien
    $('html,body').animate({
        scrollTop: $(this).offset().top
    }, 'slow');
    return false;
})

// Disparition de la Navbar dès que l'utilisateur scroll la page sauf si la souris est encore dessus
$(document).scroll(function() {
    if (!$('.navbar').is(":hover")) {
        $('.navbar').css('display', 'none')
    }
})

// Apparation de la Navbar lorsque l'utilisateur est en haut de page
$(window).scroll(function() {
    if (window.pageYOffset == 0.0)
        $('.navbar').css('display', 'flex')
})

// Apparition de la Navbar lorsque la souris entre dans la zone du menu-logo ou lorsque'on clique sur l'icône (pour les appareils tactiles)
$('.menu-logo').mouseenter(function() {
    $('.navbar').css('display', 'flex');
})
$('.bx-menu-alt-left').bind('touchstart', function(event) {
    event.preventDefault();
    $('.navbar').css('display', 'flex');
})

// Disparition de la Navbar lorsque la souris quitte sa zone (sauf si l'utilisateur se trouve en haut de la page au moment de quitter la zone de la Navbar)
$('.navbar').mouseleave(function() {
    if (window.pageYOffset != 0.0) {
        $('.navbar').css('display', 'none')
    }
})

// Gestion de l'écart entre la Navbar et le 1er container de chaque page
$(document).ready(function() {
    let margin = ($('.navbar').height());
    $('#alert').css('margin-top', margin + "px");
    $('#login-form').css('margin-top', margin + "px");
    $('#messages-page').css('margin-top', margin + "px");
    $('#message-page').css('margin-top', margin + "px");
    $('.content').css('min-height', "calc(100vh - 90px - " + margin + "px)");
})

// Gestion des cadres "front" et "back"
$('.card-inner').click(function(){
    $(this).toggleClass('flipped');
});

// Gestion du "Bonjour à tous" dynamique (type machine à écrire)
let i = 0;
let text = "Bonjour à toutes et tous !"

function sleep() {
    return new Promise (resolve => setTimeout(resolve, 5000));
}

$(document).ready(async function typeWriter() {
    if (i < text.length) {
        $('.type-writer').append(text.charAt(i));
        i++;
        setTimeout(typeWriter, 100);
    } else if (i == text.length) {
        await sleep();
        $('.type-writer').html("");
        i = 0;
        typeWriter();
    }
})

// Ajout d'une ancre à l'URL lorsque le formulaire est envoyé pour que la page ne scroll pas en haut automatiquement
function setAnchor() {
    location.hash = 'form-anchor'
}

// Gestion de la barre de progression
window.onscroll = function() {
    inProgress()
};

function inProgress() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
}

// Animation du lottie "cadenas" sur la page de login
lottie.loadAnimation({
    container: document.getElementById('lock'),
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/unlock/unlock.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
});