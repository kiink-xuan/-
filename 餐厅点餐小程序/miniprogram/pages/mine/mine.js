// pages/mine/mine.js
const app = getApp();

Page({
  data: {
    orderStats: { total: 0, active: 0, done: 0 },
    cartTotalCount: 0
  },

  onShow() {
    this.loadStats();
  },

  loadStats() {
    const orders = app.globalData.orders || [];
    const total = orders.length;
    const active = orders.filter(o => o.status !== 'done').length;
    const done = orders.filter(o => o.status === 'done').length;

    this.setData({
      orderStats: { total, active, done },
      cartTotalCount: app.globalData.cartTotalCount
    });
  },

  onGoOrders() {
    wx.switchTab({ url: '/pages/order-list/order-list' });
  },

  onGoCart() {
    wx.switchTab({ url: '/pages/cart/cart' });
  }
});
