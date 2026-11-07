const products = [
  { name: 'Բուսական հավաքածու', price: '12 500 ֏', description: 'Բնական ծաղիկներով և բյուրեղներով՝ փոքրիկ բուրավետ պարտեզ։', category: ['decor', 'gift'], image: 'public/photo_2026-11-06_22-08-27.jpg', tag: 'Նոր', stock: 'Առկա է' },
  { name: 'Դարչին և անիսոն', price: '14 800 ֏', description: 'Ջերմ համեմունքների բույր՝ դանդաղ և հարմարավետ երեկոների համար։', category: ['scented', 'gift'], image: 'public/photo_2026-11-06_22-08-28.jpg', tag: 'Սիրելի', stock: 'Առկա է' },
  { name: 'Ցիտրուսային պարտեզ', price: '11 500 ֏', description: 'Նարնջի, սոճու և դարչինի թարմ համադրություն։', category: ['scented', 'decor'], image: 'public/photo_2026-11-06_22-08-28 (2).jpg', tag: 'Բուրավետ', stock: 'Սահմանափակ' },
  { name: 'Տաք երեկո', price: '16 500 ֏', description: 'Մոմի մեղմ լույսը՝ չորացրած նարնջի և փայտի միջավայրում։', category: ['decor', 'scented'], image: 'public/photo_2026-11-06_22-08-29.jpg', tag: 'Նոր', stock: 'Առկա է' },
  { name: 'Ձմեռային բույր', price: '9 900 ֏', description: 'Բնական համեմունքների նուրբ նոտաներով՝ տաք և հանգիստ մթնոլորտի համար։', category: ['scented', 'gift'], image: 'public/photo_2026-11-06_22-08-32.jpg', tag: 'Բույր', stock: 'Առկա է' },
  { name: 'Փափուկ առավոտ', price: '15 900 ֏', description: 'Սերուցքային մոմ՝ հանգիստ տան և թեթև լույսի համար։', category: ['gift', 'decor'], image: 'public/photo_2026-11-06_22-08-30.jpg', tag: 'Նվեր', stock: 'Սահմանափակ' },
  { name: 'Սուրճի պահ', price: '13 500 ֏', description: 'Սուրճի հատիկներով ձևավորված բույր՝ ձեր փոքրիկ դադարի համար։', category: ['scented', 'gift'], image: 'public/photo_2026-11-06_22-08-31 (2).jpg', tag: 'Սիրելի', stock: 'Առկա է' },
  { name: 'Բյուրեղյա մեղմություն', price: '17 200 ֏', description: 'Բուսական տերևներ, բյուրեղներ և մաքուր, նուրբ կոմպոզիցիա։', category: ['decor', 'gift'], image: 'public/photo_2026-11-06_22-08-32 (2).jpg', tag: 'Հատուկ', stock: 'Սահմանափակ' }
];

const grid = document.querySelector('#products-grid');
const count = document.querySelector('#product-count');
const modal = document.querySelector('#order-modal');
const modalTitle = document.querySelector('#modal-title');
const whatsapp = document.querySelector('.modal-whatsapp');

function renderProducts(filter = 'all') {
  const visible = products.filter((product) => filter === 'all' || product.category.includes(filter));
  grid.innerHTML = visible.map((product, index) => `
    <article class="product-card" style="animation-delay:${index * 45}ms">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name} մոմ" loading="lazy" />
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <div class="product-line"><h3 class="product-name">${product.name}</h3><span class="product-price">${product.price}</span></div>
        <p class="product-description">${product.description}</p>
        <div class="product-meta"><span class="stock">${product.stock}</span><button class="order-button" type="button" data-product="${product.name}">Պատվիրել ↗</button></div>
      </div>
    </article>`).join('');
  count.textContent = visible.length;
  grid.querySelectorAll('.order-button').forEach((button) => button.addEventListener('click', () => openModal(button.dataset.product)));
}

function openModal(productName) {
  modalTitle.textContent = `Պատվիրել «${productName}»`;
  whatsapp.href = `https://wa.me/37499999999?text=${encodeURIComponent(`Բարև, ցանկանում եմ պատվիրել «${productName}» մոմը։`)}`;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

renderProducts();

document.querySelectorAll('.filter-btn').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  renderProducts(button.dataset.filter);
}));

document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const success = event.currentTarget.querySelector('.form-success');
  success.textContent = 'Շնորհակալություն։ Ձեր հաղորդագրությունը պատրաստ է ուղարկման համար։';
  event.currentTarget.reset();
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
