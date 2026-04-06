window.OIL_OF_YOU_PRODUCTS = [
  {
    id: 1,
    name: "Mist Harbor Morning",
    category: "Landscape Originals",
    price: 2680,
    badge: "Curator's Pick",
    image: "./assets/dawn-harbor.svg",
    size: "60 x 80 cm",
    medium: "Oil on canvas",
    palette: "Sea mist blue / amber gold",
    leadTime: "Ships in 72 hours",
    summary: "A quiet harbor scene with soft dawn light, painted for calm living rooms and reading corners."
  },
  {
    id: 2,
    name: "Terracotta Garden",
    category: "Floral Still Lifes",
    price: 1880,
    badge: "Bedroom Favorite",
    image: "./assets/terracotta-garden.svg",
    size: "50 x 70 cm",
    medium: "Oil on canvas",
    palette: "Terracotta orange / sage green",
    leadTime: "Ships in 72 hours",
    summary: "A floral still life with warmth and softness, ideal for bedrooms, dressing areas, and hallways."
  },
  {
    id: 3,
    name: "Blue Atrium",
    category: "Abstract Collectibles",
    price: 3280,
    badge: "Statement Size",
    image: "./assets/blue-atrium.svg",
    size: "80 x 100 cm",
    medium: "Textured oil painting",
    palette: "Peacock blue / limestone white",
    leadTime: "Ships in 5 days",
    summary: "A calm but commanding abstract made for larger walls that need depth without visual noise."
  },
  {
    id: 4,
    name: "Custom Portrait From Your Photo",
    category: "Custom Portraits",
    price: 3880,
    badge: "100% Handmade",
    image: "./assets/quiet-portrait.svg",
    size: "70 x 90 cm",
    medium: "Hand-painted oil on canvas",
    palette: "Skin neutrals / honey gold",
    leadTime: "Painted in 10-14 days",
    summary: "Send us one photo and we turn it into a physical handmade oil portrait designed to hang beautifully at home."
  },
  {
    id: 5,
    name: "Ember Echo",
    category: "Abstract Collectibles",
    price: 4580,
    badge: "Wall Anchor",
    image: "./assets/ember-abstract.svg",
    size: "90 x 120 cm",
    medium: "Textured oil painting",
    palette: "Burgundy / caramel brown",
    leadTime: "Ships in 5 days",
    summary: "A deeper abstract piece that stabilizes an entryway or tall wall with warmth and visual gravity."
  },
  {
    id: 6,
    name: "River Atelier",
    category: "Landscape Originals",
    price: 2360,
    badge: "New Arrival",
    image: "./assets/river-atelier.svg",
    size: "60 x 80 cm",
    medium: "Oil on canvas",
    palette: "Mist green / linen white",
    leadTime: "Ships in 72 hours",
    summary: "A soft riverside composition that feels airy, gentle, and especially suited to quiet interiors."
  },
  {
    id: 7,
    name: "Moss Window Light",
    category: "Floral Still Lifes",
    price: 1780,
    badge: "French Calm",
    image: "./assets/moss-window.svg",
    size: "45 x 60 cm",
    medium: "Oil on canvas",
    palette: "Moss green / milk white / pale gold",
    leadTime: "Ships in 72 hours",
    summary: "A smaller-format painting with softness and air, made for entryways, bedside walls, and desks."
  },
  {
    id: 8,
    name: "Golden Silence",
    category: "Abstract Collectibles",
    price: 4980,
    badge: "Featured This Week",
    image: "./assets/golden-silence.svg",
    size: "100 x 120 cm",
    medium: "Textured oil painting",
    palette: "Linen gold / stone gray / bone white",
    leadTime: "Ships in 5 days",
    summary: "A large abstract collectible for collectors who want one artwork to give the whole room its center."
  }
];

window.OIL_OF_YOU_CART_KEY = "oil-of-you-cart-v1";
window.OIL_OF_YOU_ORDER_KEY = "oil-of-you-last-order";

window.formatPrice = function formatPrice(num) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0
  }).format(Number(num));
};

window.loadCartMap = function loadCartMap() {
  try {
    const raw = localStorage.getItem(window.OIL_OF_YOU_CART_KEY);
    if (!raw) {
      return new Map();
    }

    const parsed = JSON.parse(raw);
    return new Map(Object.entries(parsed).map(([key, value]) => [Number(key), Number(value)]));
  } catch {
    return new Map();
  }
};

window.saveCartMap = function saveCartMap(cartMap) {
  const cartObject = {};

  cartMap.forEach((qty, id) => {
    cartObject[id] = qty;
  });

  localStorage.setItem(window.OIL_OF_YOU_CART_KEY, JSON.stringify(cartObject));
};

window.getCartItems = function getCartItems(cartMap) {
  return [...cartMap.entries()]
    .map(([id, qty]) => {
      const product = window.OIL_OF_YOU_PRODUCTS.find((item) => item.id === id);
      return product ? { ...product, qty, total: product.price * qty } : null;
    })
    .filter(Boolean);
};

window.getCartSummary = function getCartSummary(items) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 180;
  const insurance = subtotal === 0 ? 0 : 68;

  return {
    subtotal,
    shipping,
    insurance,
    total: subtotal + shipping + insurance
  };
};

window.saveLastOrder = function saveLastOrder(order) {
  localStorage.setItem(window.OIL_OF_YOU_ORDER_KEY, JSON.stringify(order));
};

window.loadLastOrder = function loadLastOrder() {
  try {
    const raw = localStorage.getItem(window.OIL_OF_YOU_ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
