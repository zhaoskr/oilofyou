const cart = window.loadCartMap();
const checkoutItems = document.getElementById("checkoutItems");
const checkoutForm = document.getElementById("checkoutForm");
const items = window.getCartItems(cart);

function renderSummary(lineItems) {
  const summary = window.getCartSummary(lineItems);
  document.getElementById("ckSubtotal").textContent = window.formatPrice(summary.subtotal);
  document.getElementById("ckShipping").textContent = window.formatPrice(summary.shipping);
  document.getElementById("ckInsurance").textContent = window.formatPrice(summary.insurance);
  document.getElementById("ckTotal").textContent = window.formatPrice(summary.total);
}

function renderItems(lineItems) {
  if (!lineItems.length) {
    checkoutItems.innerHTML = `
      <div class="empty-card compact">
        <h3>收藏袋还是空的</h3>
        <p><a href="./index.html">先去挑一幅作品</a>，再回来填写信息。</p>
      </div>
    `;
    return;
  }

  checkoutItems.innerHTML = "";

  lineItems.forEach((item) => {
    const line = document.createElement("div");
    line.className = "summary-row summary-item";
    line.innerHTML = `
      <span class="item-row">
        <img class="thumb" src="${item.image}" alt="${item.name}" />
        ${item.name} x ${item.qty}
      </span>
      <strong>${window.formatPrice(item.total)}</strong>
    `;
    checkoutItems.appendChild(line);
  });
}

renderItems(items);
renderSummary(items);

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!items.length) {
    alert("收藏袋还是空的，请先添加作品。");
    return;
  }

  const formData = new FormData(checkoutForm);
  const summary = window.getCartSummary(items);
  const orderId = `OOY-${Date.now().toString().slice(-8)}`;

  window.saveLastOrder({
    id: orderId,
    name: formData.get("name"),
    city: formData.get("city"),
    delivery: formData.get("delivery"),
    total: summary.total
  });

  localStorage.removeItem(window.OIL_OF_YOU_CART_KEY);
  window.location.href = `./order-success.html?orderId=${orderId}`;
});
