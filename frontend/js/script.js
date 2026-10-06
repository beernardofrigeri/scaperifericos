var slides = [
    { image: "img/img_banner/aulaf75_one.jpg", title: "Teclado Aula F75", text: "Teclado mecânico compacto, switches hot-swap, iluminação RGB e construção robusta — ideal para produtividade e jogos.", price: "R$ 249,00", link: "html/teclados/aulaf75.html" },
    { image: "img/img_banner/aulaf75_two.jpg", title: "Teclado Aula F75", text: "Teclado mecânico compacto, switches hot-swap, iluminação RGB e construção robusta — ideal para produtividade e jogos.", price: "R$ 249,00", link: "html/teclados/aulaf75.html" },
    { image: "img/img_banner/aulaf75_three.jpg", title: "Teclado Aula F75", text: "Teclado mecânico compacto, switches hot-swap, iluminação RGB e construção robusta — ideal para produtividade e jogos.", price: "R$ 249,00", link: "html/teclados/aulaf75.html" },
    { image: "img/img_banner/aulaf75_four.jpg", title: "Teclado Aula F75", text: "Teclado mecânico compacto, switches hot-swap, iluminação RGB e construção robusta — ideal para produtividade e jogos.", price: "R$ 249,00", link: "html/teclados/aulaf75.html" },
    { image: "img/img_banner/l8_pro_one.webp", title: "Machenike L8 Pro", text: "Mouse gamer tri-modo com sensor PAW3395, polling rate de até 8000Hz com fio e base de carregamento sem fio.", price: "R$ 299,00", link: "html/mouses/l8.html" },
    { image: "img/img_banner/l8_pro_two.webp", title: "Machenike L8 Pro", text: "Mouse gamer tri-modo com sensor PAW3395, polling rate de até 8000Hz com fio e base de carregamento sem fio.", price: "R$ 299,00", link: "html/mouses/l8.html" },
    { image: "img/img_banner/g733_one.jpg", title: "Headset Logitech G733", text: "Headset sem fio leve e confortável, com som imersivo, microfone removível e iluminação RGB.", price: "R$ 449,00", link: "html/fones/g733.html" },
    { image: "img/img_banner/g733_two.jpg", title: "Headset Logitech G733", text: "Headset sem fio leve e confortável, com som imersivo, microfone removível e iluminação RGB.", price: "R$ 449,00", link: "html/fones/g733.html" },
    { image: "img/img_banner/g733_three.jpg", title: "Headset Logitech G733", text: "Headset sem fio leve e confortável, com som imersivo, microfone removível e iluminação RGB.", price: "R$ 449,00", link: "html/fones/g733.html" }
];
var indice = 0;
var AUTOPLAY_MS = 5000;
var banner = document.getElementById('banner');
var bannerArea = document.getElementById('area_banner');
var bannerViewport = document.getElementById('banner-viewport');
var bannerTrack = document.getElementById('banner-track');
var dots = document.getElementById('banner-dots');
var bannerTitle = document.getElementById('banner-title');
var bannerText = document.getElementById('banner-text');
var bannerPrice = document.getElementById('banner-price');
var botaoMore = document.getElementById('banner-more');
var autoplayTimer;
var dragStartX = 0;
var dragOffsetX = 0;
var isDragging = false;

function atualizarDescricao() {
    var slide = slides[indice];
    if (bannerTitle) bannerTitle.textContent = slide.title;
    if (bannerText) bannerText.textContent = slide.text;
    if (bannerPrice) bannerPrice.textContent = slide.price;
    if (botaoMore) botaoMore.onclick = () => { location.href = slide.link; };
}

function atualizarBolinhas() {
    if (!dots) return;
    dots.querySelectorAll('button').forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === indice);
        dot.setAttribute('aria-current', dotIndex === indice ? 'true' : 'false');
    });
}

function mostrarSlide(novoIndice, animar = true) {
    if (!bannerTrack) return;
    var passouDoFim = novoIndice >= slides.length;
    var passouDoInicio = novoIndice < 0;
    indice = (novoIndice + slides.length) % slides.length;
    var slide = slides[indice];
    var indiceDoTrilho = passouDoFim ? slides.length + 1 : passouDoInicio ? 0 : indice + 1;
    bannerTrack.style.transition = animar ? 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
    bannerTrack.style.transform = `translate3d(${-(indiceDoTrilho * 100 / (slides.length + 2))}%, 0, 0)`;
    atualizarDescricao();
    atualizarBolinhas();

    if (animar && (passouDoFim || passouDoInicio)) {
        bannerTrack.addEventListener('transitionend', () => {
            bannerTrack.style.transition = 'none';
            bannerTrack.style.transform = `translate3d(${-(indice + 1) * 100 / (slides.length + 2)}%, 0, 0)`;
        }, { once: true });
    }
}

function iniciarAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => mostrarSlide(indice + 1), AUTOPLAY_MS);
}

if (bannerTrack && dots) {
    bannerTrack.innerHTML = '';
    var slidesDoTrilho = [slides[slides.length - 1]].concat(slides, slides[0]);
    slidesDoTrilho.forEach((slide, slideIndex) => {
        var image = document.createElement('img');
        image.src = slide.image;
        image.alt = slide.title;
        image.draggable = false;
        bannerTrack.appendChild(image);
    });
    slides.forEach((slide, slideIndex) => {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.ariaLabel = `Exibir imagem ${slideIndex + 1}`;
        dot.addEventListener('pointerdown', (event) => event.stopPropagation());
        dot.addEventListener('click', () => { mostrarSlide(slideIndex); iniciarAutoplay(); });
        dots.appendChild(dot);
    });
    mostrarSlide(0, false);
    iniciarAutoplay();
    bannerViewport.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        isDragging = true;
        dragStartX = event.clientX;
        dragOffsetX = 0;
        bannerTrack.style.transition = 'none';
        bannerViewport.setPointerCapture(event.pointerId);
    });
    bannerViewport.addEventListener('pointermove', (event) => {
        if (!isDragging) return;
        dragOffsetX = event.clientX - dragStartX;
        var width = bannerViewport.clientWidth || 1;
        var baseOffset = -(indice + 1) * width;
        bannerTrack.style.transform = `translate3d(${baseOffset + dragOffsetX}px, 0, 0)`;
    });
    bannerViewport.addEventListener('pointerup', () => {
        if (!isDragging) return;
        isDragging = false;
        if (Math.abs(dragOffsetX) > 50) {
            mostrarSlide(indice + (dragOffsetX < 0 ? 1 : -1));
        } else {
            mostrarSlide(indice);
        }
        iniciarAutoplay();
    });
    bannerViewport.addEventListener('pointercancel', () => { isDragging = false; mostrarSlide(indice); });
    bannerViewport.addEventListener('dragstart', (event) => event.preventDefault());
}
// shopping cart helpers ------------------------------------------------
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(value) || 0);
}
function getCoupon() {
    return localStorage.getItem('cartCoupon') || '';
}
function getDiscountRate() {
    return getCoupon() === 'SCA10' ? 0.1 : 0;
}
function addToCart(product) {
    if (!product || !product.id) return;
    let cart = getCart();
    let existing = cart.find(p => p.id === product.id);
    if (existing) {
        existing.qty = (existing.qty || 0) + 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    alert('Produto adicionado ao carrinho!');
}

// called by product pages if they still use the old onclick style
function adicionar_carrinho() {
    // this function is kept for backwards compatibility; it expects a button
    // with data-* attributes describing the product.
    let btn = event.currentTarget || null;
    if (!btn) return;
    let product = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image
    };
    addToCart(product);
}

// cart rendering ----------------------------------------------------------
function renderCart() {
    let container = document.getElementById('cart-items');
    let subtotalEl = document.getElementById('cart-subtotal');
    let discountEl = document.getElementById('cart-discount');
    let totalEl = document.getElementById('cart-total');
    let checkoutBtn = document.getElementById('checkout-btn');
    if (!container || !totalEl) return;
    let cart = getCart();
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>Seu carrinho está vazio.</p>';
        if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
        if (discountEl) discountEl.textContent = formatCurrency(0);
        totalEl.textContent = formatCurrency(0);
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }
    let total = 0;
    cart.forEach(item => {
        let itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image || ''}" alt="${item.title}" width="60" height="60">
            <span class="cart-title">${item.title}</span>
            <input type="number" min="1" value="${item.qty}" data-id="${item.id}" class="cart-qty">
            <span class="cart-price">${formatCurrency(item.price)}</span>
            <button data-id="${item.id}" class="cart-remove">×</button>
        `;
        container.appendChild(itemEl);
        total += (item.price || 0) * item.qty;
    });
    let discount = total * getDiscountRate();
    if (subtotalEl) subtotalEl.textContent = formatCurrency(total);
    if (discountEl) discountEl.textContent = formatCurrency(discount);
    totalEl.textContent = formatCurrency(total - discount);
    if (checkoutBtn) checkoutBtn.style.display = 'block';    // attach listeners
    container.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(btn.dataset.id);
        });
    });
    container.querySelectorAll('.cart-qty').forEach(input => {
        input.addEventListener('change', () => {
            updateQuantity(input.dataset.id, parseInt(input.value, 10));
        });
    });
}

function removeFromCart(id) {
    let cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
}

function updateQuantity(id, qty) {
    if (qty < 1) return;
    let cart = getCart();
    let item = cart.find(i => i.id === id);
    if (item) {
        item.qty = qty;
        saveCart(cart);
        renderCart();
    }
}

// generic initializer ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // attach handlers to "add to cart" buttons that use data-* attributes
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            // try to build product info from dataset; if missing, fall back to DOM
            let title = btn.dataset.title || '';
            let price = btn.dataset.price ? parseFloat(btn.dataset.price) : NaN;
            let image = btn.dataset.image || '';
            let id = btn.dataset.id || '';
            
            // when info is missing, look at page structure
            if (!title) {
                const h3 = btn.closest('.produto-descricao')?.querySelector('h3');
                if (h3) title = h3.textContent.replace(':','').trim();
            }
            
            // Try multiple ways to find the price
            if (isNaN(price) || price === 0) {
                const strong = btn.closest('.produto-descricao')?.querySelector('strong') ||
                               btn.closest('div')?.querySelector('strong');
                if (strong) {
                    let txt = strong.textContent.replace(/[^0-9,\.]/g,'').replace(',','.');
                    price = parseFloat(txt) || 0;
                }
                // Also try to find price in parent divs
                if (isNaN(price) || price === 0) {
                    let parent = btn.closest('div');
                    if (parent) {
                        let allText = parent.textContent;
                        let priceMatch = allText.match(/R\$?\s*([0-9,\.]+)/);
                        if (priceMatch) {
                            let priceStr = priceMatch[1].replace(',', '.');
                            price = parseFloat(priceStr) || 0;
                        }
                    }
                }
            }
            
            // Try multiple ways to find the image
            if (!image) {
                image = btn.closest('.produto-descricao')?.querySelector('img')?.src ||
                        btn.closest('div')?.querySelector('img')?.src ||
                        document.getElementById('banner_produto')?.src || '';
            }
            
            if (!id) {
                id = title.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');
            }
            
            let product = { id, title, price, image };
            addToCart(product);
        });
    });

    // if cart page present render it
    if (document.getElementById('cart-items')) {
        renderCart();
        setupCheckout();
    }
});

// Checkout functionality
function setupCheckout() {
    let checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', startCheckout);
    }
    let couponForm = document.getElementById('coupon-form');
    if (couponForm) {
        couponForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let input = document.getElementById('coupon-code');
            let message = document.getElementById('coupon-message');
            let code = input.value.trim().toUpperCase();
            if (code === 'SCA10') {
                localStorage.setItem('cartCoupon', code);
                message.textContent = 'Cupom aplicado: 10% de desconto.';
                message.style.color = '#16803c';
            } else {
                localStorage.removeItem('cartCoupon');
                message.textContent = 'Cupom inválido.';
                message.style.color = '#b00020';
            }
            renderCart();
        });
    }
}

function startCheckout() {
    let cart = getCart();
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Show loading modal
    let modal = document.getElementById('loading-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'loading-modal';
        modal.className = 'loading-modal show';
        modal.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <p class="loading-text">Processando compra...</p>
        `;
        document.body.appendChild(modal);
    } else {
        modal.classList.add('show');
    }
    
    let progressFill = modal.querySelector('.progress-fill');
    let progress = 0;
    
    let interval = setInterval(() => {
        progress += Math.random() * 40;
        if (progress > 90) progress = 90;
        progressFill.style.width = progress + '%';
    }, 100);
    
    setTimeout(() => {
        clearInterval(interval);
        progressFill.style.width = '100%';
        
        setTimeout(() => {
            modal.classList.remove('show');
            localStorage.removeItem('cart');
            localStorage.removeItem('cartCoupon');
            alert('Compra finalizada com sucesso! Obrigado pela compra.');
            location.reload();
        }, 500);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.caixa_segundaria_contato form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
    e.preventDefault();

    const templateParams = {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        assunto: form.assunto.value,
        mensagem: form.mensagem.value,
    };

    emailjs.send('service_d11c0t4', 'template_uvs2glb', templateParams)
        .then(() => {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        })
        .catch(() => {
            alert('Erro ao enviar. Tente novamente.');
        });
});

    const btnWhatsapp = document.getElementById('btn-whatsapp');
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', () => {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;

            const texto = `Olá! Meu nome é ${nome}.\nE-mail: ${email}\nTelefone: ${telefone}\nAssunto: ${assunto}\nMensagem: ${mensagem}`;
            window.open(`https://wa.me/555491475125?text=${encodeURIComponent(texto)}`, '_blank');
        });
    }
});