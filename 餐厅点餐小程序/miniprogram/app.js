// app.js — 饭店点餐小程序入口
App({
  globalData: {
    // 全局购物车数据 { dishId: { dish, count, spec, totalPrice } }
    cart: {},
    // 购物车总数量
    cartTotalCount: 0,
    // 购物车总金额
    cartTotalPrice: 0,
    // 订单列表
    orders: []
  },

  onLaunch() {
    // 启动时从本地存储恢复购物车数据
    this.loadCartFromStorage();
    this.loadOrdersFromStorage();
  },

  // 从本地存储加载购物车
  loadCartFromStorage() {
    try {
      const cart = wx.getStorageSync('cart') || {};
      const cartTotalCount = wx.getStorageSync('cartTotalCount') || 0;
      const cartTotalPrice = wx.getStorageSync('cartTotalPrice') || 0;
      this.globalData.cart = cart;
      this.globalData.cartTotalCount = cartTotalCount;
      this.globalData.cartTotalPrice = cartTotalPrice;
    } catch (e) {
      console.error('加载购物车失败', e);
    }
  },

  // 保存购物车到本地存储
  saveCartToStorage() {
    try {
      wx.setStorageSync('cart', this.globalData.cart);
      wx.setStorageSync('cartTotalCount', this.globalData.cartTotalCount);
      wx.setStorageSync('cartTotalPrice', this.globalData.cartTotalPrice);
    } catch (e) {
      console.error('保存购物车失败', e);
    }
  },

  // 从本地存储加载订单
  loadOrdersFromStorage() {
    try {
      const orders = wx.getStorageSync('orders') || [];
      this.globalData.orders = orders;
    } catch (e) {
      console.error('加载订单失败', e);
    }
  },

  // 保存订单到本地存储
  saveOrdersToStorage() {
    try {
      wx.setStorageSync('orders', this.globalData.orders);
    } catch (e) {
      console.error('保存订单失败', e);
    }
  },

  // 添加菜品到购物车
  addToCart(dish, count = 1, spec = '') {
    const cart = this.globalData.cart;
    const key = spec ? `${dish.id}_${spec}` : `${dish.id}`;

    if (cart[key]) {
      cart[key].count += count;
    } else {
      cart[key] = {
        dish: dish,
        count: count,
        spec: spec,
        key: key
      };
    }

    this.recalculateCart();
    this.saveCartToStorage();
  },

  // 从购物车移除菜品
  removeFromCart(key) {
    const cart = this.globalData.cart;
    if (cart[key]) {
      delete cart[key];
    }
    this.recalculateCart();
    this.saveCartToStorage();
  },

  // 更新购物车中菜品数量
  updateCartCount(key, count) {
    const cart = this.globalData.cart;
    if (cart[key]) {
      if (count <= 0) {
        delete cart[key];
      } else {
        cart[key].count = count;
      }
    }
    this.recalculateCart();
    this.saveCartToStorage();
  },

  // 清空购物车
  clearCart() {
    this.globalData.cart = {};
    this.globalData.cartTotalCount = 0;
    this.globalData.cartTotalPrice = 0;
    this.saveCartToStorage();
  },

  // 重新计算购物车总数和总价
  recalculateCart() {
    const cart = this.globalData.cart;
    let totalCount = 0;
    let totalPrice = 0;

    Object.values(cart).forEach(item => {
      totalCount += item.count;
      totalPrice += item.dish.price * item.count;
    });

    this.globalData.cartTotalCount = totalCount;
    this.globalData.cartTotalPrice = totalPrice;
  },

  // 获取购物车列表（数组形式）
  getCartList() {
    return Object.values(this.globalData.cart);
  },

  // 创建订单
  createOrder(orderInfo) {
    const cartList = this.getCartList();
    const order = {
      id: this.generateOrderId(),
      items: JSON.parse(JSON.stringify(cartList)),
      totalPrice: this.globalData.cartTotalPrice,
      status: 'pending', // pending | cooking | served | done
      statusText: '待接单',
      tableNo: orderInfo.tableNo || '',
      guestCount: orderInfo.guestCount || 1,
      remark: orderInfo.remark || '',
      createTime: new Date().toLocaleString(),
      timestamp: Date.now()
    };

    this.globalData.orders.unshift(order);
    this.saveOrdersToStorage();
    this.clearCart();

    return order;
  },

  // 生成订单号
  generateOrderId() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `NO${dateStr}${timeStr}${random}`;
  },

  // 更新订单状态
  updateOrderStatus(orderId, newStatus) {
    const orders = this.globalData.orders;
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      const statusMap = {
        'pending': '待接单',
        'cooking': '备菜中',
        'served': '已上菜',
        'done': '已完成'
      };
      order.statusText = statusMap[newStatus] || newStatus;
      this.saveOrdersToStorage();
    }
  },

  // 获取订单列表（可按状态筛选）
  getOrders(status = 'all') {
    if (status === 'all') {
      return this.globalData.orders;
    }
    return this.globalData.orders.filter(o => o.status === status);
  }
});
