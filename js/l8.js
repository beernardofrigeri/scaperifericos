var imagens = [
    "../../img/l8_pro_dupla.webp",
    "../../img/l8_pro_preto.webp",
    "../../img/l8_pro_branco.webp",
    "../../img/img_banner/l8_pro_one.webp",
    "../../img/img_banner/l8_pro_two.webp"
];
var indice = 0;
var TRANSITION_MS = 150;
var banner = document.getElementById('banner_produto');
var prevBtn = document.getElementById('button-retorno');
var nextBtn = document.getElementById('button-avanco');

if (banner) {
    banner.style.transition = `opacity ${TRANSITION_MS}ms ease`;
    banner.style.opacity = '1';
}

var isSwitching = false;

function animateButton(btn) {
    if (!btn) return;
    btn.classList.add('nav-anim');
    setTimeout(() => btn.classList.remove('nav-anim'), 180);
}

function mostrarImagem() {
    if (!banner) return;
    var proxima = imagens[indice];
    if (banner.dataset.target === proxima) return;
    banner.dataset.target = proxima;

    if (banner._onFade) {
        banner.removeEventListener('transitionend', banner._onFade);
    }

    var onTransitionEnd = (event) => {
        if (event.propertyName !== 'opacity') return;
        banner.removeEventListener('transitionend', onTransitionEnd);
        banner._onFade = null;
        banner.src = proxima;
        requestAnimationFrame(() => requestAnimationFrame(() => banner.style.opacity = '1'));
    };

    banner._onFade = onTransitionEnd;
    banner.addEventListener('transitionend', onTransitionEnd);
    banner.style.opacity = '0';
    setTimeout(() => { isSwitching = false; }, TRANSITION_MS * 2 + 60);
}

function nextImage() {
    if (isSwitching) return;
    isSwitching = true;
    animateButton(nextBtn);
    indice = (indice + 1) % imagens.length;
    mostrarImagem();
}

function prevImage() {
    if (isSwitching) return;
    isSwitching = true;
    animateButton(prevBtn);
    indice = (indice - 1 + imagens.length) % imagens.length;
    mostrarImagem();
}

if (nextBtn) nextBtn.addEventListener('click', nextImage);
if (prevBtn) prevBtn.addEventListener('click', prevImage);
