const products = [
  {
    id: 1,
    title: "Диван Arlo",
    desc: "Мягкий диван для гостиной в спокойном бежевом оттенке.",
    size: "220 × 95 см",
    price: 64900,
    image: "./images/product-1.png"
  },
  {
    id: 2,
    title: "Кресло Lino",
    desc: "Компактное кресло для чтения, отдыха и уютного угла.",
    size: "82 × 78 см",
    price: 28900,
    image: "./images/product-2.png"
  },
  {
    id: 3,
    title: "Стол Terra",
    desc: "Обеденный стол из дерева для кухни или гостиной.",
    size: "160 × 90 см",
    price: 45900,
    image: "./images/product-3.png"
  },
  {
    id: 4,
    title: "Шкаф Nord",
    desc: "Вместительный шкаф с минималистичным фасадом.",
    size: "180 × 220 см",
    price: 72900,
    image: "./images/product-4.png"
  },
  {
    id: 5,
    title: "Тумба Soft",
    desc: "Низкая тумба под телевизор с закрытым хранением.",
    size: "180 × 45 см",
    price: 24900,
    image: "./images/product-5.png"
  },
  {
    id: 6,
    title: "Кровать Milky",
    desc: "Кровать с мягким изголовьем для спокойной спальни.",
    size: "200 × 180 см",
    price: 58900,
    image: "./images/product-6.png"
  },
  {
    id: 7,
    title: "Комод Brownie",
    desc: "Комод для спальни или прихожей с глубокими ящиками.",
    size: "120 × 85 см",
    price: 36900,
    image: "./images/product-7.png"
  },
  {
    id: 8,
    title: "Стеллаж Frame",
    desc: "Открытый стеллаж для книг, декора и хранения.",
    size: "90 × 190 см",
    price: 31900,
    image: "./images/product-8.png"
  },
  {
    id: 9,
    title: "Пуф Linen",
    desc: "Небольшой пуф в текстильной обивке для спальни.",
    size: "55 × 45 см",
    price: 12900,
    image: "./images/product-9.png"
  },
  {
    id: 10,
    title: "Консоль Mira",
    desc: "Узкая консоль для прихожей, коридора или гостиной.",
    size: "110 × 35 см",
    price: 22900,
    image: "./images/product-10.png"
  },
  {
    id: 11,
    title: "Стул Beige",
    desc: "Стул с мягким сиденьем для кухни или рабочего места.",
    size: "48 × 54 см",
    price: 9900,
    image: "./images/product-11.png"
  },
  {
    id: 12,
    title: "Журнальный стол Leaf",
    desc: "Низкий столик для зоны отдыха и мягкого интерьера.",
    size: "90 × 60 см",
    price: 18900,
    image: "./images/product-12.png"
  }
];

const productsTrack = document.querySelector("#productsTrack");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

const cartPanel = document.querySelector("#cartPanel");
const cartShadow = document.querySelector("#cartShadow");
const openCartBtn = document.querySelector("#openCartBtn");
const closeCartBtn = document.querySelector("#closeCartBtn");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");
const checkoutBtn = document.querySelector("#checkoutBtn");

const quickModal = document.querySelector("#quickModal");
const quickCloseBtn = document.querySelector("#quickCloseBtn");
const quickProductText = document.querySelector("#quickProductText");
const quickSendBtn = document.querySelector("#quickSendBtn");
const quickName = document.querySelector("#quickName");
const quickPhone = document.querySelector("#quickPhone");
const quickError = document.querySelector("#quickError");

const burgerBtn = document.querySelector("#burgerBtn");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

let sliderIndex = 0;
let cart = [];

function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}

function getProductsPerView() {
  if (window.innerWidth <= 760) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function renderProducts() {
  productsTrack.innerHTML = products.map(product => `
    <article class="product">
      <div class="product-inner">
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}">
        </div>

        <div class="product-content">
          <h3>${product.title}</h3>
          <p>${product.desc}</p>

          <div class="product-info">
            <span>Размер</span>
            <strong>${product.size}</strong>
          </div>

          <div class="product-price">${formatPrice(product.price)}</div>

          <div class="product-actions">
            <button class="add-btn" onclick="addToCart(${product.id})">
              В корзину
            </button>
            <button class="buy-btn" onclick="openQuickBuy(${product.id})">
              Купить в 1 клик
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function updateSlider() {
  const perView = getProductsPerView();
  const maxIndex = products.length - perView;

  if (sliderIndex > maxIndex) sliderIndex = maxIndex;
  if (sliderIndex < 0) sliderIndex = 0;

  const move = sliderIndex * (100 / perView);
  productsTrack.style.transform = `translateX(-${move}%)`;
}

function nextSlide() {
  const perView = getProductsPerView();
  const maxIndex = products.length - perView;

  if (sliderIndex < maxIndex) {
    sliderIndex++;
    updateSlider();
  }
}

function prevSlide() {
  if (sliderIndex > 0) {
    sliderIndex--;
    updateSlider();
  }
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  renderCart();
  openCart();
}

function increaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  cartItem.quantity++;
  renderCart();
}

function decreaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem.quantity > 1) {
    cartItem.quantity--;
  } else {
    cart = cart.filter(item => item.id !== productId);
  }

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Корзина пока пустая. Добавьте мебель из каталога, чтобы оформить заказ.
      </p>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">

        <div>
          <h4>${item.title}</h4>
          <p>${formatPrice(item.price)}</p>

          <div class="cart-line">
            <div class="quantity">
              <button onclick="decreaseQuantity(${item.id})">−</button>
              <span>${item.quantity}</span>
              <button onclick="increaseQuantity(${item.id})">+</button>
            </div>

            <button class="remove-btn" onclick="removeFromCart(${item.id})">
              Удалить
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartTotal.textContent = formatPrice(total);
  cartCount.textContent = count;
}

function openCart() {
  cartPanel.classList.add("active");
  cartShadow.classList.add("active");
}

function closeCart() {
  cartPanel.classList.remove("active");
  cartShadow.classList.remove("active");
}

function openQuickBuy(productId) {
  const product = products.find(item => item.id === productId);
  quickProductText.textContent = `Вы выбрали: ${product.title} — ${formatPrice(product.price)}. Оставьте контакты, и менеджер свяжется с вами.`;
  quickError.textContent = "";
  quickName.classList.remove("input-error");
  quickPhone.classList.remove("input-error");
  quickModal.classList.add("active");
  document.body.classList.add("modal-open");
  quickName.focus();
}

function closeQuickBuy() {
  quickModal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

function sendQuickRequest() {
  const name = quickName.value.trim();
  const phone = quickPhone.value.trim();

  quickName.classList.toggle("input-error", !name);
  quickPhone.classList.toggle("input-error", !phone);

  if (!name || !phone) {
    quickError.textContent = "Заполните имя и телефон, чтобы отправить заявку.";
    return;
  }

  quickError.textContent = "";
  alert("Заявка отправлена! В реальном проекте здесь можно подключить форму.");
  quickName.value = "";
  quickPhone.value = "";
  closeQuickBuy();
}

function checkout() {
  if (cart.length === 0) {
    alert("Сначала добавьте товар в корзину.");
    return;
  }

  alert("Заказ оформлен! В реальном проекте здесь можно подключить форму или оплату.");
}

function openMenu() {
  nav.classList.add("active");
  burgerBtn.classList.add("active");
  document.body.classList.add("menu-open");
  burgerBtn.setAttribute("aria-expanded", "true");
  burgerBtn.setAttribute("aria-label", "Закрыть меню");
}

function closeMenu() {
  nav.classList.remove("active");
  burgerBtn.classList.remove("active");
  document.body.classList.remove("menu-open");
  burgerBtn.setAttribute("aria-expanded", "false");
  burgerBtn.setAttribute("aria-label", "Открыть меню");
}

function toggleMenu() {
  if (nav.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartShadow.addEventListener("click", closeCart);

quickCloseBtn.addEventListener("click", closeQuickBuy);
quickSendBtn.addEventListener("click", sendQuickRequest);
checkoutBtn.addEventListener("click", checkout);

quickModal.addEventListener("click", event => {
  if (event.target === quickModal) closeQuickBuy();
});

[quickName, quickPhone].forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");

    if (quickName.value.trim() && quickPhone.value.trim()) {
      quickError.textContent = "";
    }
  });
});

burgerBtn.addEventListener("click", toggleMenu);

navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
  updateSlider();
});

renderProducts();
renderCart();
updateSlider();
