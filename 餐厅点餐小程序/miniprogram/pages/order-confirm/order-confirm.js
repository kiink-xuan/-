// pages/order-confirm/order-confirm.js
const app = getApp();

Page({
  data: {
    cartList: [],
    totalPrice: 0,
    packageFee: 2,
    guestCount: 2,
    tableNo: '',
    remark: ''
  },

  onLoad(options) {
    this.loadCart();
    if (options.remark) {
      this.setData({ remark: decodeURIComponent(options.remark) });
    }
  },

  onShow() {
    this.loadCart();
  },

  loadCart() {
    const cartList = app.getCartList();
    if (cartList.length === 0) {
      wx.showToast({ title: '购物车为空', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({
      cartList,
      totalPrice: app.globalData.cartTotalPrice
    });
  },

  // 用餐人数
  onGuestDecrease() {
    if (this.data.guestCount <= 1) return;
    this.setData({ guestCount: this.data.guestCount - 1 });
  },
  onGuestIncrease() {
    this.setData({ guestCount: this.data.guestCount + 1 });
  },

  // 桌号输入
  onTableInput(e) {
    this.setData({ tableNo: e.detail.value });
  },

  // 备注输入
  onRemarkInput(e) {
    this.setData({ remark: e.detail.value });
  },

  // 提交订单
  onSubmitOrder() {
    if (!this.data.tableNo.trim()) {
      wx.showToast({ title: '请输入桌号', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '提交中...' });

    // 模拟支付流程
    setTimeout(() => {
      const order = app.createOrder({
        tableNo: this.data.tableNo,
        guestCount: this.data.guestCount,
        remark: this.data.remark
      });

      wx.hideLoading();
      wx.showToast({ title: '下单成功！', icon: 'success', duration: 2000 });

      // 跳转到订单详情
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/order-detail/order-detail?id=${order.id}`
        });
      }, 2000);
    }, 800);
  }
});
