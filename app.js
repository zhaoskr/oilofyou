const products = window.OIL_OF_YOU_PRODUCTS;
const categories = ["全部", ...new Set(products.map((product) => product.category))];
let selectedCategory = "全部";
let searchText = "";
const cart = window.loadCartMap();

const categoryFilters = document.getElementById("categoryFilters");
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const goCartBtn = document.getElementById("goCartBtn");

function buildCategoryChips() {
  categoryFilters.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip ${category === selectedCategory ? "active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      selectedCategory = category;
      buildCategoryChips();
      renderProducts();
    });
    categoryFilters.appendChild(button);
  });
}

function renderProducts() {
  const query = searchText.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const hitCategory = selectedCategory === "全部" || product.category === selectedCategory;
    const haystack = [
      product.name,
      product.category,
      product.summary,
      product.palette,
      product.medium
    ]
      .join(" ")
      .toLowerCase();

    return hitCategory && (!query || haystack.includes(query));
  });

  productGrid.innerHTML = "";

  if (!filteredProducts.length) {
    productGrid.innerHTML = `
      <article class="empty-card">
        <h3>没有找到匹配作品</h3>
        <p>试试搜索“风景”“抽象”“花卉”，或者切换到其他系列。</p>
      </article>
    `;
    return;
  }

  filteredProducts.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product";
    card.style.animationDelay = `${index * 45}ms`;
    card.innerHTML = `
      <div class="frame-shell">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <span class="tag">${product.badge}</span>
      <h3>${product.name}</h3>
      <p class="product-summary">${product.summary}</p>
      <div class="product-meta">
        <span>${product.category}</span>
        <span>${product.size}</span>
      </div>
      <div class="product-meta muted">
        <span>${product.medium}</span>
        <span>${product.leadTime}</span>
      </div>
      <div class="product-bottom">
        <p class="product-price">${window.formatPrice(product.price)}</p>
        <button type="button">加入收藏袋</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => addToCart(product.id));
    productGrid.appendChild(card);
  });
}

function addToCart(productId) {
  cart.set(productId, (cart.get(productId) || 0) + 1);
  renderCart();
  toggleCart(true);
}

function updateQty(productId, delta) {
  const nextQty = (cart.get(productId) || 0) + delta;

  if (nextQty <= 0) {
    cart.delete(productId);
  } else {
    cart.set(productId, nextQty);
  }

  renderCart();
}

function renderCart() {
  const items = window.getCartItems(cart);
  const qtyCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  window.saveCartMap(cart);
  cartCount.textContent = qtyCount;
  cartSubtotal.textContent = window.formatPrice(subtotal);

  if (!items.length) {
    cartItems.innerHTML = `
      <div class="empty-card compact">
        <h3>收藏袋还是空的</h3>
        <p>先选一幅能让空间安静下来的画，我们再一起结账。</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="item-row">
        <img class="thumb" src="${item.image}" alt="${item.name}" />
        <div>
          <strong>${item.name}</strong>
          <p class="small">${item.size} · ${item.medium}</p>
        </div>
      </div>
      <div class="cart-meta">
        <span>${window.formatPrice(item.price)}</span>
        <div class="qty">
          <button type="button" aria-label="减少数量">-</button>
          <span>${item.qty}</span>
          <button type="button" aria-label="增加数量">+</button>
        </div>
      </div>
      <span>小计：<strong>${window.formatPrice(item.total)}</strong></span>
    `;

    const [minusButton, plusButton] = row.querySelectorAll("button");
    minusButton.addEventListener("click", () => updateQty(item.id, -1));
    plusButton.addEventListener("click", () => updateQty(item.id, 1));
    cartItems.appendChild(row);
  });
}

function toggleCart(isOpen) {
  cartDrawer.classList.toggle("open", isOpen);
  overlay.classList.toggle("show", isOpen);
  cartDrawer.setAttribute("aria-hidden", String(!isOpen));
}

searchInput.addEventListener("input", (event) => {
  searchText = event.target.value;
  renderProducts();
});

cartBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
overlay.addEventListener("click", () => toggleCart(false));
goCartBtn.addEventListener("click", () => {
  window.location.href = "./cart.html";
});

buildCategoryChips();
renderProducts();
renderCart();
