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
    cartTotalPrice: 0
  },

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

    // 无规格直接加入购物车 + 动画反馈
    app.addToCart(dish, 1, '');
    this.updateCartInfo();

    // 轻触反馈
    wx.vibrateShort({ type: 'light' });
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
  }
});
