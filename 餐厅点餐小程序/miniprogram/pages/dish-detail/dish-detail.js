// pages/dish-detail/dish-detail.js
const mock = require('../../utils/mock.js');
const app = getApp();

Page({
  data: {
    dish: null,
    quantity: 1,
    selectedSpecs: {},
    cartTotalCount: 0,
    cartTotalPrice: 0
  },

  onLoad(options) {
    const dishId = parseInt(options.id);
    const dish = mock.dishes.find(d => d.id === dishId);
    if (dish) {
      const selectedSpecs = {};
      if (dish.specs && dish.specs.length > 0) {
        dish.specs.forEach(spec => { selectedSpecs[spec.name] = spec.options[0]; });
      }
      this.setData({ dish, selectedSpecs });
    }
    this.updateCartInfo();
  },

  onShow() { this.updateCartInfo(); },

  onSelectSpec(e) {
    const { specName, option } = e.currentTarget.dataset;
    const selectedSpecs = { ...this.data.selectedSpecs };
    selectedSpecs[specName] = option;
    this.setData({ selectedSpecs });
  },

  onDecrease() {
    if (this.data.quantity <= 1) return;
    this.setData({ quantity: this.data.quantity - 1 });
  },

  onIncrease() { this.setData({ quantity: this.data.quantity + 1 }); },

  onAddToCart() {
    const { dish, quantity, selectedSpecs } = this.data;
    if (!dish) return;
    const specStr = Object.values(selectedSpecs).join('/');
    app.addToCart(dish, quantity, specStr);
    wx.showToast({ title: '已加入购物车', icon: 'success', duration: 1500 });
    wx.vibrateShort({ type: 'medium' });
    this.updateCartInfo();
  },

  onPreviewCart() { wx.switchTab({ url: '/pages/cart/cart' }); },

  updateCartInfo() {
    this.setData({
      cartTotalCount: app.globalData.cartTotalCount,
      cartTotalPrice: app.globalData.cartTotalPrice
    });
  }
});
