const cart = window.loadCartMap();
const cartPageItems = document.getElementById("cartPageItems");

function updateQty(productId, delta) {
  const nextQty = (cart.get(productId) || 0) + delta;

  if (nextQty <= 0) {
    cart.delete(productId);
  } else {
    cart.set(productId, nextQty);
  }

  render();
}

function renderSummary(items) {
  const summary = window.getCartSummary(items);
  document.getElementById("sumSubtotal").textContent = window.formatPrice(summary.subtotal);
  document.getElementById("sumShipping").textContent = window.formatPrice(summary.shipping);
  document.getElementById("sumInsurance").textContent = window.formatPrice(summary.insurance);
  document.getElementById("sumTotal").textContent = window.formatPrice(summary.total);
}

function render() {
  window.saveCartMap(cart);
  const items = window.getCartItems(cart);

  if (!items.length) {
    cartPageItems.innerHTML = `
      <div class="empty-card">
        <h3>收藏袋还是空的</h3>
        <p><a href="./index.html">回到首页</a>，先挑一幅让空间更安静的作品吧。</p>
      </div>
    `;
    renderSummary(items);
    return;
  }

  cartPageItems.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="item-row">
        <img class="thumb" src="${item.image}" alt="${item.name}" />
        <div>
          <strong>${item.name}</strong>
          <p class="small">${item.category} · ${item.size}</p>
        </div>
      </div>
      <div class="cart-meta">
        <span>${window.formatPrice(item.price)}</span>
        <span class="small">${item.leadTime}</span>
      </div>
      <div class="cart-meta">
        <div class="qty">
          <button type="button" aria-label="减少数量">-</button>
          <span>${item.qty}</span>
          <button type="button" aria-label="增加数量">+</button>
        </div>
        <strong>${window.formatPrice(item.total)}</strong>
      </div>
    `;

    const [minusButton, plusButton] = row.querySelectorAll("button");
    minusButton.addEventListener("click", () => updateQty(item.id, -1));
    plusButton.addEventListener("click", () => updateQty(item.id, 1));
    cartPageItems.appendChild(row);
  });

  renderSummary(items);
}

render();
