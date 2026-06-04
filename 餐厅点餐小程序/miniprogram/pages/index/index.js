// pages/index/index.js — 菜单浏览首页
const mock = require('../../utils/mock.js');
const app = getApp();

Page({
  data: {
    // 分类数据
    categories: [],
    currentCategoryId: 1,
    scrollToCategory: '',

    // 菜品数据
    allDishes: [],
    filteredDishes: [],

    // 搜索
    searchKeyword: '',

    // 购物车数据
    cartTotalCount: 0,
    cartTotalPrice: 0,

    // 飞入动画小球
    flyBalls: []
  },

  _ballId: 0,

  onLoad() {
    this.setData({
      categories: mock.categories,
      allDishes: mock.dishes
    });
    this.filterDishesByCategory(mock.categories[0].id);
    this.updateCartInfo();
  },

  onShow() {
    // 每次显示页面时更新购物车数据
    this.updateCartInfo();
    // 如果当前有筛选条件，重新筛选
    if (this.data.searchKeyword) {
      this.filterDishesBySearch(this.data.searchKeyword);
    } else {
      this.filterDishesByCategory(this.data.currentCategoryId);
    }
  },

  // 切换分类
  onSwitchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({ currentCategoryId: categoryId });
    this.filterDishesByCategory(categoryId);
  },

  // 按分类筛选菜品
  filterDishesByCategory(categoryId) {
    const dishes = this.data.allDishes.filter(
      d => d.categoryId === categoryId
    );
    this.setData({ filteredDishes: dishes, searchKeyword: '' });
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    if (!keyword.trim()) {
      this.filterDishesByCategory(this.data.currentCategoryId);
      return;
    }
    this.filterDishesBySearch(keyword.trim());
  },

  // 搜索确认
  onSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (keyword) {
      this.filterDishesBySearch(keyword);
    }
  },

  // 按关键词搜索
  filterDishesBySearch(keyword) {
    const dishes = this.data.allDishes.filter(d =>
      d.name.includes(keyword) || d.desc.includes(keyword)
    );
    this.setData({ filteredDishes: dishes });
  },

  // 清除搜索
  onClearSearch() {
    this.setData({ searchKeyword: '' });
    this.filterDishesByCategory(this.data.currentCategoryId);
  },

  // 点击菜品进入详情
  onDishTap(e) {
    const dish = e.currentTarget.dataset.dish;
    wx.navigateTo({
      url: `/pages/dish-detail/dish-detail?id=${dish.id}`
    });
  },

  // 加购按钮（+号）
  onAddToCart(e) {
    const dish = e.currentTarget.dataset.dish;

    // 如果有多规格，跳转详情页选择
    if (dish.specs && dish.specs.length > 0) {
      wx.navigateTo({
        url: `/pages/dish-detail/dish-detail?id=${dish.id}`
      });
      return;
    }

    // 无规格直接加入购物车
    app.addToCart(dish, 1, '');
    this.updateCartInfo();

    // 触感反馈
    wx.vibrateShort({ type: 'light' });

    // 触发飞入动画
    this.triggerFlyAnimation(e);
  },

  // 飞入购物车动画
  triggerFlyAnimation(e) {
    const systemInfo = wx.getSystemInfoSync();
    const screenWidth = systemInfo.windowWidth;
    const screenHeight = systemInfo.windowHeight;

    // 起始位置：按钮所在位置（估算在卡片右下方）
    const startX = screenWidth - 60;
    const startY = (e.currentTarget && e.currentTarget.offsetTop) ? e.currentTarget.offsetTop + 180 : screenHeight * 0.4;

    // 终点位置：购物车图标位置（屏幕左下角）
    const endX = 68;
    const endY = screenHeight - 70;

    const ballId = ++this._ballId;
    const ball = { id: ballId, x: startX, y: startY, animation: null };
    const flyBalls = this.data.flyBalls.concat(ball);
    this.setData({ flyBalls });

    // 使用 animate API 创建关键帧动画（抛物线模拟）
    const duration = 500;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out 缓动
      const t = 1 - Math.pow(1 - progress, 3);

      // 当前位置（线性插值 + 抛物线 y 偏移）
      const currentX = startX + (endX - startX) * t;
      const arcHeight = 120; // 抛物线最高点
      const baseY = startY + (endY - startY) * t;
      const currentY = baseY - arcHeight * Math.sin(progress * Math.PI);

      const updatedBalls = this.data.flyBalls.map(b => {
        if (b.id === ballId) {
          return { ...b, x: currentX, y: currentY };
        }
        return b;
      });
      this.setData({ flyBalls: updatedBalls });

      if (progress >= 1) {
        clearInterval(timer);
        // 移除小球 & 购物车弹跳反馈
        const filtered = this.data.flyBalls.filter(b => b.id !== ballId);
        this.setData({ flyBalls: filtered });
      }
    }, 16); // ~60fps
  },

  // 更新购物车信息
  updateCartInfo() {
    this.setData({
      cartTotalCount: app.globalData.cartTotalCount,
      cartTotalPrice: app.globalData.cartTotalPrice
    });
  },

  // 跳转购物车
  onGoToCart() {
    if (app.globalData.cartTotalCount === 0) return;
    wx.switchTab({ url: '/pages/cart/cart' });
  },

  // 滚动监听（可用于后续联动左侧分类高亮）
  onDishScroll() {
    // 预留：根据滚动位置自动切换左侧分类高亮
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      categories: mock.categories,
      allDishes: mock.dishes
    });
    this.updateCartInfo();
    if (this.data.searchKeyword) {
      this.filterDishesBySearch(this.data.searchKeyword);
    } else {
      this.filterDishesByCategory(this.data.currentCategoryId);
    }
    wx.stopPullDownRefresh();
    wx.showToast({ title: '已刷新', icon: 'success', duration: 1000 });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '好味道餐厅 - 地道中式家常菜',
      path: '/pages/index/index'
    };
  }
});
