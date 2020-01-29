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

// Gestion du background animé
var colors = new Array(
    // [0,0,128],
    // [0,0,255],
    // [1,31,85],
    // [0,152,255],
    // [32,146,223],
    // [65,87,128]
    [1, 31, 85],
    [17, 43, 90],
    [64, 79, 106],
    [1, 27, 74],
    [33, 55, 96],
    [48, 67, 101]
);
  
var step = 0;

var colorIndices = [0,1,2,3];
  
var gradientSpeed = 0.002;
  
function updateGradient() {
    
    if ( $===undefined ) return;
    
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];
    
    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb("+r1+","+g1+","+b1+")";
    
    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb("+r2+","+g2+","+b2+")";
  
    $('body').css({
        background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"
    });
    
    step += gradientSpeed;

    if ( step >= 1 )
    {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    }
  }
  
  setInterval(updateGradient,10);