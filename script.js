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

function setActive(element) {
  document.querySelectorAll('header nav a')
    .forEach(link => link.classList.remove('active'));
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

  cart.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>
        <img src="${item.image}" width="50" height="50" style="border-radius:6px;">
      </td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price * item.quantity}</td>
      <td>
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </td>
    `;

    cartItems.appendChild(row);
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById('total').innerText = totalPrice;
  updateCartCount();
}

// ✅ FIXED addToCart (GLOBAL, NOT NESTED)
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  renderCart();
}

// Change quantity
function changeQuantity(index, amount) {
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
  document.getElementById("ratingValue").value = star;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("feedbackForm").addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("fname").value;
    const message = document.getElementById("fmsg").value;
    const rating = document.getElementById("ratingValue").value;

    if (!rating) {
      alert("Select rating");
      return;
    }

    fetch("http://localhost:3000/submit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, rating })
    })
    .then(res => res.text())
    .then(data => {
      document.getElementById("feedbackMsg").innerText = data;
      e.target.reset();
      document.getElementById("ratingValue").value = "";
    });
  });
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

// Set initial active nav
document.addEventListener('DOMContentLoaded', () => {
  setActive(document.querySelector('header nav a'));
});


