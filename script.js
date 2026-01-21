let cart = [];

// ========== NAVIGATION & STARTUP ==========
function showSection(id) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    // Show selected section
    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    // Update nav links
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const activeLink = document.getElementById(`nav-${id}`);
    if (activeLink) activeLink.classList.add('active');
}

// Ensure page starts correctly
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("loggedIn") === "true") {
        showSection('home');
        updateAuthUI(true);
    } else {
        showSection('login');
        updateAuthUI(false);
    }
    setupStarRating();
});

// ========== LOGIN LOGIC (Any Input) ==========
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user !== "" && pass !== "") {
        localStorage.setItem("loggedIn", "true");
        updateAuthUI(true);
        showSection('home');
    } else {
        document.getElementById("loginMsg").innerText = "Please enter credentials.";
    }
});

function logout() {
    localStorage.removeItem("loggedIn");
    updateAuthUI(false);
    showSection('login');
}

function updateAuthUI(isLoggedIn) {
    document.getElementById("loginLink").style.display = isLoggedIn ? "none" : "block";
    document.getElementById("logoutLink").style.display = isLoggedIn ? "block" : "none";
}

// ========== STAR RATING LOGIC ==========
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = star.getAttribute('data-value');
            ratingInput.value = val;
            
            // Visual update
            stars.forEach(s => {
                s.style.color = s.getAttribute('data-value') <= val ? "#e63946" : "#ccc";
            });
        });
    });
}

document.getElementById("feedbackForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const rating = document.getElementById("ratingValue").value;
    if (rating === "0") return alert("Please select a star rating!");
    
    document.getElementById("feedbackMsg").innerText = "Thank you for your feedback! ✅";
    this.reset();
    document.querySelectorAll('.star').forEach(s => s.style.color = "#ccc");
});

// ========== CART LOGIC ==========
function addToCart(name, price, image) {
    const item = cart.find(i => i.name === name);
    item ? item.qty++ : cart.push({ name, price, image, qty: 1 });
    renderCart();
    alert(name + " added to cart!");
}

function renderCart() {
    const container = document.getElementById("cartItems");
    container.innerHTML = cart.map((item, index) => `
        <tr>
            <td><img src="${item.image}" width="50"></td>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>₹${item.price * item.qty}</td>
            <td><button onclick="changeQty(${index}, -1)">-</button></td>
        </tr>
    `).join('');
    
    document.getElementById("total").innerText = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    document.getElementById("cartCount").innerText = cart.reduce((s, i) => s + i.qty, 0);
}

function changeQty(index, amt) {
    cart[index].qty += amt;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    renderCart();
}
function checkout() {
  // 1. Check if cart has items
  if (cart.length === 0) {
    alert("Your cart is empty! Please add some delicious treats first. 🧁");
    return;
  }

  // 2. Get the total price for the message
  const finalTotal = document.getElementById('total').innerText;

  // 3. Clear the cart data
  cart = [];

  // 4. Update the UI to show the cart is empty
  renderCart();

  // 5. Display a success message
  // You can use a simple alert or update a div on the page
  alert(`🎉 Order Successful!\n\nThank you for shopping with Sweet Crumbs. Your total was ₹${finalTotal}.\nYour treats will be ready shortly!`);

  // 6. Redirect to Home section
  showSection('home');
}


