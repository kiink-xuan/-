/**
 * server/routes/dishes.js — 菜品相关 API
 */
const express = require('express');
const router = express.Router();
const { categories, dishes } = require('../data/mock-data');

// 获取所有分类
router.get('/categories', (_req, res) => {
  res.json({ code: 0, data: categories });
});

// 获取菜品列表（支持分类筛选和关键词搜索）
router.get('/', (req, res) => {
  const { categoryId, keyword, recommend } = req.query;
  let result = [...dishes];

  if (categoryId) {
    result = result.filter(d => d.categoryId === Number(categoryId));
  }
  if (keyword) {
    result = result.filter(d =>
      d.name.includes(keyword) || d.desc.includes(keyword)
    );
  }
  if (recommend === 'true') {
    result = result.filter(d => d.recommend);
  }

  res.json({ code: 0, data: result, total: result.length });
});

// 获取菜品详情
router.get('/:id', (req, res) => {
  const dish = dishes.find(d => d.id === Number(req.params.id));
  if (!dish) {
    return res.status(404).json({ code: 404, msg: '菜品不存在' });
  }
  res.json({ code: 0, data: dish });
});

module.exports = router;
