// pages/order-list/order-list.js
const app = getApp();
const { ORDER_STATUS_MAP } = require('../../utils/mock.js');

Page({
  data: {
    tabs: [
      { label: '全部', value: 'all' },
      { label: '进行中', value: 'active' },
      { label: '已完成', value: 'done' }
    ],
    currentTab: 'all',
    allOrders: [],
    filteredOrders: [],
    statusMap: ORDER_STATUS_MAP
  },

  onShow() {
    this.loadOrders();
  },

  loadOrders() {
    const orders = app.globalData.orders || [];
    this.setData({ allOrders: orders });
    this.filterOrders();
  },

  onSwitchTab(e) {
    const tab = e.currentTarget.dataset.value;
    this.setData({ currentTab: tab });
    this.filterOrders();
  },

  filterOrders() {
    const { currentTab, allOrders } = this.data;
    let filtered;

    if (currentTab === 'all') {
      filtered = allOrders;
    } else if (currentTab === 'active') {
      filtered = allOrders.filter(o => o.status === 'pending' || o.status === 'cooking' || o.status === 'served');
    } else {
      filtered = allOrders.filter(o => o.status === 'done');
    }

    this.setData({ filteredOrders: filtered });
  },

  onOrderTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/order-detail/order-detail?id=${id}` });
  },

  // 催单
  onUrgeOrder(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '已催单，请稍候', icon: 'none' });
    wx.vibrateShort();
  },

  // 再来一单
  onReorder(e) {
    const order = e.currentTarget.dataset.order;
    if (order && order.items) {
      order.items.forEach(item => {
        app.addToCart(item.dish, item.count, item.spec || '');
      });
      wx.showToast({ title: '已加入购物车', icon: 'success' });
      wx.vibrateShort();
    }
  },

  // 去菜单
  onGoMenu() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadOrders();
    wx.stopPullDownRefresh();
    wx.showToast({ title: '已刷新', icon: 'success', duration: 1000 });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '我的订单 - 好味道餐厅',
      path: '/pages/index/index'
    };
  }
});
