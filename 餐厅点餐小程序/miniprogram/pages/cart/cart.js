// pages/cart/cart.js
const app = getApp();

Page({
  data: {
    cartList: [],
    cartTotalCount: 0,
    cartTotalPrice: 0,
    remark: ''
  },

  onShow() {
    this.loadCart();
  },

  loadCart() {
    const cartList = app.getCartList();
    this.setData({
      cartList,
      cartTotalCount: app.globalData.cartTotalCount,
      cartTotalPrice: app.globalData.cartTotalPrice
    });
  },

  // 减少数量
  onDecrease(e) {
    const key = e.currentTarget.dataset.key;
    const item = app.globalData.cart[key];
    if (item) {
      app.updateCartCount(key, item.count - 1);
      this.loadCart();
    }
  },

  // 增加数量
  onIncrease(e) {
    const key = e.currentTarget.dataset.key;
    const item = app.globalData.cart[key];
    if (item) {
      app.updateCartCount(key, item.count + 1);
      this.loadCart();
    }
  },

  // 清空购物车
  onClearCart() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearCart();
          this.setData({ remark: '' });
          this.loadCart();
        }
      }
    });
  },

  // 备注输入
  onRemarkInput(e) {
    this.setData({ remark: e.detail.value });
  },

  // 去结算
  onCheckout() {
    if (app.globalData.cartTotalCount === 0) {
      wx.showToast({ title: '请先选择菜品', icon: 'none' });
      return;
    }
    const remark = this.data.remark;
    wx.navigateTo({
      url: `/pages/order-confirm/order-confirm?remark=${encodeURIComponent(remark)}`
    });
  },

  // 去菜单
  onGoMenu() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
