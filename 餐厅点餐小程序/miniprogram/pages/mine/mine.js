// pages/mine/mine.js — 个人中心
const app = getApp();

Page({
  data: {
    userInfo: null,
    isLogin: false,
    orderStats: { total: 0, active: 0, done: 0 },
    cartTotalCount: 0
  },

  onShow() {
    this.loadUserInfo();
    this.loadStats();
  },

  loadUserInfo() {
    this.setData({
      userInfo: app.globalData.userInfo,
      isLogin: app.globalData.isLogin
    });
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

  // 微信授权登录
  onLogin() {
    wx.getUserProfile({
      desc: '用于展示头像和昵称',
      success: (res) => {
        app.setUserInfo(res.userInfo);
        this.loadUserInfo();
        wx.showToast({ title: '登录成功', icon: 'success' });
      },
      fail: (err) => {
        console.log('用户取消授权', err);
        // 兜底：使用默认信息
        app.setUserInfo({
          nickName: '美食爱好者',
          avatarUrl: ''
        });
        this.loadUserInfo();
      }
    });
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout();
          this.loadUserInfo();
          wx.showToast({ title: '已退出', icon: 'none' });
        }
      }
    });
  },

  onGoOrders() {
    wx.switchTab({ url: '/pages/order-list/order-list' });
  },

  onGoCart() {
    wx.switchTab({ url: '/pages/cart/cart' });
  },

  onGoMenu() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  // 联系客服
  onContact() {
    wx.showModal({
      title: '联系客服',
      content: '客服电话：400-123-4567\n营业时间：10:00-22:00',
      showCancel: false
    });
  },

  // 关于我们
  onAbout() {
    wx.showModal({
      title: '好味道餐厅',
      content: '版本 1.0.0\n一家专注于中式家常菜的温馨餐厅。\n用最新鲜的食材，做最地道的味道。',
      showCancel: false
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadUserInfo();
    this.loadStats();
    wx.stopPullDownRefresh();
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '好味道餐厅 - 地道中式家常菜',
      path: '/pages/index/index'
    };
  }
});
