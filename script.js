// ===== STATE =====
let cart = [];

// ===== NAVIGATION =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function setActive(el) {
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}

// ===== CART =====
function updateCartCount() {
  document.getElementById('cartCount').innerText =
    cart.reduce((sum, i) => sum + i.quantity, 0);
}

function renderCart() {
  const tbody = document.getElementById('cartItems');
  tbody.innerHTML = '';

  cart.forEach((item, i) => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${item.image}" width="50"></td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price * item.quantity}</td>
        <td>
          <button onclick="changeQuantity(${i},1)">+</button>
          <button onclick="changeQuantity(${i},-1)">-</button>
        </td>
      </tr>`;
  });

  document.getElementById('total').innerText =
    cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  updateCartCount();
}

function addToCart(name, price, image) {
  const item = cart.find(i => i.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, image, quantity: 1 });
  renderCart();
}

function changeQuantity(i, amt) {
  cart[i].quantity += amt;
  if (cart[i].quantity <= 0) cart.splice(i, 1);
  renderCart();
}

function checkout() {
  alert("Order placed! Total ₹" + document.getElementById('total').innerText);
  cart = [];
  renderCart();
}

// ===== LOGIN =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("loginMsg");

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (username.value === "admin" && password.value === "sweet123") {
      msg.style.color = "green";
      msg.textContent = "Login successful!";
      localStorage.setItem("loggedIn", "true");
      showSection("home");
    } else {
      msg.style.color = "red";
      msg.textContent = "Invalid credentials";
    }
  });

  if (localStorage.getItem("loggedIn") !== "true") {
    showSection("login");
  }
});

function logout() {
  localStorage.removeItem("loggedIn");
  showSection("login");
}



