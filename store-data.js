window.OIL_OF_YOU_PRODUCTS = [
  {
    id: 1,
    name: "雾港晨光",
    category: "风景原作",
    price: 2680,
    badge: "策展推荐",
    image: "./assets/dawn-harbor.svg",
    size: "60 x 80 cm",
    medium: "布面油画",
    palette: "海雾蓝 / 琥珀金",
    leadTime: "现货 72 小时发出",
    summary: "轻薄晨雾、海港与金色天光交叠，适合客厅与阅读区主墙。"
  },
  {
    id: 2,
    name: "赭石花园",
    category: "花卉静物",
    price: 1880,
    badge: "柔和卧室款",
    image: "./assets/terracotta-garden.svg",
    size: "50 x 70 cm",
    medium: "布面油画",
    palette: "陶土橙 / 鼠尾草绿",
    leadTime: "现货 72 小时发出",
    summary: "像旧花园被午后阳光照亮，适合卧室、走廊与梳妆区。"
  },
  {
    id: 3,
    name: "静蓝中庭",
    category: "抽象藏品",
    price: 3280,
    badge: "大幅推荐",
    image: "./assets/blue-atrium.svg",
    size: "80 x 100 cm",
    medium: "厚涂油画",
    palette: "孔雀蓝 / 石灰白",
    leadTime: "现货 5 天内发出",
    summary: "更适合大面积留白墙面，画面层次足够安静，也足够有存在感。"
  },
  {
    id: 4,
    name: "琥珀肖像 No.1",
    category: "人物肖像",
    price: 3880,
    badge: "收藏级肖像",
    image: "./assets/quiet-portrait.svg",
    size: "70 x 90 cm",
    medium: "布面油画",
    palette: "肤棕 / 蜜蜡金",
    leadTime: "定制 10-14 天",
    summary: "保留人物情绪与皮肤层次，适合作为纪念、婚礼或个人藏品。"
  },
  {
    id: 5,
    name: "炽焰回声",
    category: "抽象藏品",
    price: 4580,
    badge: "展墙主角",
    image: "./assets/ember-abstract.svg",
    size: "90 x 120 cm",
    medium: "厚涂油画",
    palette: "勃艮第红 / 焦糖棕",
    leadTime: "现货 5 天内发出",
    summary: "适合玄关与挑空墙面，用更深的色阶把空间视觉拉稳。"
  },
  {
    id: 6,
    name: "河岸工作室",
    category: "风景原作",
    price: 2360,
    badge: "新到画作",
    image: "./assets/river-atelier.svg",
    size: "60 x 80 cm",
    medium: "布面油画",
    palette: "雾灰绿 / 亚麻白",
    leadTime: "现货 72 小时发出",
    summary: "像窗外的河岸和室内的静物同时被记录下来，温和而耐看。"
  },
  {
    id: 7,
    name: "苔绿窗影",
    category: "花卉静物",
    price: 1780,
    badge: "轻法式适配",
    image: "./assets/moss-window.svg",
    size: "45 x 60 cm",
    medium: "布面油画",
    palette: "苔绿 / 奶白 / 淡金",
    leadTime: "现货 72 小时发出",
    summary: "小尺幅也能有空气感，适合玄关、床头与书桌背景。"
  },
  {
    id: 8,
    name: "金色寂静",
    category: "抽象藏品",
    price: 4980,
    badge: "本周焦点",
    image: "./assets/golden-silence.svg",
    size: "100 x 120 cm",
    medium: "厚涂油画",
    palette: "亚麻金 / 岩灰 / 骨白",
    leadTime: "现货 5 天内发出",
    summary: "大尺幅抽象作品，适合想让空间更完整、更有重心的收藏者。"
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
