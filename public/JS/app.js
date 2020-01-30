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

// Disparition de la Navbar lorsque la souris quitte sa zone (sauf si l'utilisateur se trouve en haut de la page au moment de quitter la zone de la Navbar)
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
    $('#message-page').css('margin-top', margin + "px");

})

// Gestion des cadres "front" et "back" pour les appareils tactiles
$('.flip-card-front').bind('touchstart', function(event) {
    event.preventDefault();
    $(this).closest('.flip-card-inner').toggleClass('back-is-visible'); 
})
$('.flip-card-back ul li').bind('touchstart', function(event) {
    event.preventDefault();
    $(this).closest('.flip-card-inner').toggleClass('back-is-visible'); 
})

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
    } 
    // else if (i == text.length) {
    //     await sleep();
    //     $('.type-writer').html("");
    //     i = 0;
    //     typeWriter();
    // }
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