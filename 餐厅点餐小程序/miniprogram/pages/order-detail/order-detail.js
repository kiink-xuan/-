// pages/order-detail/order-detail.js
const app = getApp();
const { ORDER_STATUS_MAP } = require('../../utils/mock.js');

Page({
  data: {
    order: null,
    statusInfo: {},
    statusDesc: '',
    steps: [
      { step: 0, label: '已下单', icon: '📋' },
      { step: 1, label: '备菜中', icon: '👨‍🍳' },
      { step: 2, label: '已上菜', icon: '🍽️' },
      { step: 3, label: '已完成', icon: '✅' }
    ]
  },

  onLoad(options) {
    const orderId = options.id;
    const orders = app.globalData.orders || [];
    const order = orders.find(o => o.id === orderId);

    if (order) {
      const statusInfo = ORDER_STATUS_MAP[order.status] || ORDER_STATUS_MAP['pending'];
      const descMap = {
        'pending': '订单已提交，等待商家确认',
        'cooking': '大厨正在精心烹饪中',
        'served': '菜品已上桌，请慢用',
        'done': '感谢您的光临，欢迎再次惠顾'
      };
      this.setData({
        order,
        statusInfo,
        statusDesc: descMap[order.status] || ''
      });
    }
  },

  onShow() {
    // 刷新订单状态（从本地存储重新加载）
    if (this.data.order) {
      const orders = app.globalData.orders || [];
      const order = orders.find(o => o.id === this.data.order.id);
      if (order) {
        const statusInfo = ORDER_STATUS_MAP[order.status] || ORDER_STATUS_MAP['pending'];
        const descMap = {
          'pending': '订单已提交，等待商家确认',
          'cooking': '大厨正在精心烹饪中',
          'served': '菜品已上桌，请慢用',
          'done': '感谢您的光临，欢迎再次惠顾'
        };
        this.setData({
          order,
          statusInfo,
          statusDesc: descMap[order.status] || ''
        });
      }
    }
  },

  // 催单
  onUrge() {
    wx.showToast({ title: '已催单，请稍候', icon: 'none' });
    wx.vibrateShort();

    // 模拟：催单后状态可能更新
    if (this.data.order.status === 'pending') {
      setTimeout(() => {
        app.updateOrderStatus(this.data.order.id, 'cooking');
        this.onShow();
      }, 2000);
    }
  },

  // 标记完成
  onMarkDone() {
    wx.showModal({
      title: '确认完成',
      content: '确认菜品已全部上齐并完成用餐？',
      success: (res) => {
        if (res.confirm) {
          app.updateOrderStatus(this.data.order.id, 'done');
          wx.showToast({ title: '用餐愉快！', icon: 'success' });
          this.onShow();
        }
      }
    });
  },

  // 再来一单
  onReorder() {
    const order = this.data.order;
    if (order && order.items) {
      order.items.forEach(item => {
        app.addToCart(item.dish, item.count, item.spec || '');
      });
      wx.showToast({ title: '已加入购物车', icon: 'success' });
      wx.vibrateShort();
    }
  }
});
