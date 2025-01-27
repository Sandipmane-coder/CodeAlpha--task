// Get product data from the backend
async function loadProducts() {
    const response = await fetch("/api/products");
    const products = await response.json();
  
    const productList = document.getElementById("product-list");
    products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productDiv);
    });
  }
  
  // Shopping cart data
  let cart = [];
  
  // Add product to the cart
  function addToCart(productId) {
    fetch("/api/products")
      .then(response => response.json())
      .then(products => {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
      });
  }
  
  // Update the cart display
  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear the cart
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price}`;
      cartItems.appendChild(li);
    });
  }
  
  // Handle checkout
  document.getElementById("checkout-btn").addEventListener("click", () => {
    const order = {
      items: cart,
      total: cart.reduce((total, item) => total + item.price, 0),
    };
  
    fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        cart = []; // Clear cart
        updateCart();
      });
  });
  
  // Load products when the page loads
  window.onload = loadProducts;
  