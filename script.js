// ========== STATE ==========
let cart = [];

// ========== NAVIGATION ==========
function showSection(id) {
  document.querySelectorAll('main .section').forEach(section => {
    section.classList.remove('active');
  });
  const sec = document.getElementById(id);
  if (sec) sec.classList.add('active');
}

// Set active nav link styling
function setActive(element) {
  document.querySelectorAll('header nav a').forEach(link => link.classList.remove('active'));
  element.classList.add('active');
}

// ========== CART FUNCTIONS ==========
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = count;
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  cart.forEach((item, i) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price * item.quantity}</td>
      <td>
        <button onclick="changeQuantity(${i}, -1)">-</button>
        <button onclick="changeQuantity(${i}, 1)">+</button>
      </td>
    `;

    cartItems.appendChild(row);
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('total').innerText = totalPrice;

  updateCartCount();
}

// Add item or increase quantity if exists
function addToCart(name, price) {
  const index = cart.findIndex(item => item.name === name);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  renderCart();
  showSection('cart');

  // Show add-to-cart message
  const msgDiv = document.getElementById('cartMessage');
  msgDiv.innerText = `Added "${name}" to cart!`;
  msgDiv.style.opacity = '1';

  setTimeout(() => {
    msgDiv.style.opacity = '0';
  }, 3000);
}

// Change quantity and remove if zero
function changeQuantity(index, amount) {
  if (!cart[index]) return;

  cart[index].quantity += amount;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert('Thank you for your order! Total: ₹' + document.getElementById('total').innerText);
  cart = [];
  renderCart();
  showSection('home');
}

// ========== FEEDBACK ==========
function rate(star) {
  document.getElementById('ratingValue').value = star;

  const stars = document.querySelectorAll('.rating span');
  stars.forEach((s, i) => {
    if (i < star) s.classList.add('selected');
    else s.classList.remove('selected');
  });
}

document.getElementById('feedbackForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('fname').value.trim();
  const msg = document.getElementById('fmsg').value.trim();
  const rating = document.getElementById('ratingValue').value;

  if (!rating) {
    alert('Please select a rating!');
    return;
  }

  // Here you can send feedback to server or store locally
  document.getElementById('feedbackMsg').innerText = `Thanks, ${name}! Your feedback with rating ${rating} stars is received.`;

  e.target.reset();
  document.querySelectorAll('.rating span').forEach(s => s.classList.remove('selected'));
  document.getElementById('ratingValue').value = '';
});

// ========== LOGIN ==========
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginMsg = document.getElementById('loginMsg');

  if (username === 'admin' && password === 'sweet123') {
    loginMsg.style.color = 'green';
    loginMsg.innerText = `Login successful! Welcome, ${username} 🙂`;
    e.target.reset();
  } else {
    loginMsg.style.color = 'red';
    loginMsg.innerText = 'Invalid username or password.';
  }
});

// Set initial nav active link on page load
document.addEventListener('DOMContentLoaded', () => {
  setActive(document.querySelector('header nav a'));
});

