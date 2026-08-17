// Manejo del carrito de compras usando localStorage
const CART_KEY = 'faltaElMateCart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// item: { id, type, name, category, price, image, quantity }
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(p => p.id === item.id && p.type === item.type);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartItemQuantity(index, quantity) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

function cartTotalCount() {
  return getCart().reduce((sum, p) => sum + p.quantity, 0);
}

function cartTotalPrice() {
  return getCart().reduce((sum, p) => sum + p.quantity * p.price, 0);
}

function updateCartBadge() {
  const count = cartTotalCount();
  document.querySelectorAll('.cart span').forEach(el => el.textContent = count);
}

// Muestra un aviso breve arriba a la derecha al agregar un producto
function showCartToast(message) {
  let toast = document.getElementById('cartToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cartToast';
    toast.style.cssText = 'position:fixed;top:20px;right:20px;background:#2e382a;color:#fff;padding:14px 22px;border-radius:10px;font-size:14px;font-weight:600;z-index:9999;box-shadow:0 8px 20px rgba(0,0,0,.2);opacity:0;transition:opacity .3s;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => { toast.style.opacity = '0'; }, 2200);
}

// Agrega un producto al carrito directamente desde una tarjeta de listado (mates.html, bombillas.html, etc.)
function addModelToCart(event, id, type, name, category, price, image) {
  if (event) event.preventDefault();
  addToCart({ id, type, name, category, price, image, quantity: 1 });
  showCartToast('✓ ' + name + ' agregado al carrito');
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
