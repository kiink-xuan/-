/**
 * server/routes/orders.js — 订单相关 API
 * 包含订单 CRUD 和模拟状态自动流转
 */
const express = require('express');
const router = express.Router();
const { orders, ORDER_STATUS, ORDER_STATUS_MAP } = require('../data/mock-data');

// 模拟状态自动推进的定时器 Map
const autoTimers = new Map();

// 生成订单号
function generateOrderId() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const rand = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `NO${date}${time}${rand}`;
}

// 启动订单状态自动流转（模拟商家操作）
function startAutoProgress(orderId) {
  const stages = [
    { status: ORDER_STATUS.COOKING, delay: 3000 },   // 3s 后 → 备菜中
    { status: ORDER_STATUS.SERVED,  delay: 8000 },   // 8s 后 → 已上菜
    { status: ORDER_STATUS.DONE,    delay: 15000 }    // 15s 后 → 已完成
  ];

  stages.forEach(({ status, delay }) => {
    const timer = setTimeout(() => {
      const order = orders.find(o => o.id === orderId);
      if (order && order.status !== ORDER_STATUS.DONE) {
        order.status = status;
        order.statusText = ORDER_STATUS_MAP[status].text;
        console.log(`📢 订单 ${orderId} 状态更新: ${ORDER_STATUS_MAP[status].text}`);
        if (status === ORDER_STATUS.DONE) {
          autoTimers.delete(orderId);
        }
      }
    }, delay);
    // 存储 timer 引用以便清理
    if (!autoTimers.has(orderId)) autoTimers.set(orderId, []);
    autoTimers.get(orderId).push(timer);
  });
}

// 获取订单列表（支持状态筛选）
router.get('/', (req, res) => {
  const { status } = req.query;
  let result = [...orders];

  if (status === 'active') {
    result = result.filter(o => o.status !== ORDER_STATUS.DONE);
  } else if (status && status !== 'all') {
    result = result.filter(o => o.status === status);
  }

  // 按时间倒序
  result.sort((a, b) => b.timestamp - a.timestamp);

  res.json({ code: 0, data: result, total: result.length });
});

// 获取订单详情
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ code: 404, msg: '订单不存在' });
  }
  res.json({ code: 0, data: order });
});

// 创建订单
router.post('/', (req, res) => {
  const { items, totalPrice, tableNo, guestCount, remark } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ code: 400, msg: '订单菜品不能为空' });
  }

  const order = {
    id: generateOrderId(),
    items,
    totalPrice,
    status: ORDER_STATUS.PENDING,
    statusText: ORDER_STATUS_MAP[ORDER_STATUS.PENDING].text,
    tableNo: tableNo || '',
    guestCount: guestCount || 1,
    remark: remark || '',
    createTime: new Date().toLocaleString('zh-CN'),
    timestamp: Date.now()
  };

  orders.unshift(order);

  // 启动自动状态流转
  startAutoProgress(order.id);

  res.json({ code: 0, data: order, msg: '下单成功' });
});

// 更新订单状态（催单、确认完成等）
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ code: 404, msg: '订单不存在' });
  }
  if (!ORDER_STATUS_MAP[status]) {
    return res.status(400).json({ code: 400, msg: '无效的状态' });
  }

  order.status = status;
  order.statusText = ORDER_STATUS_MAP[status].text;

  res.json({ code: 0, data: order, msg: '状态更新成功' });
});

// 催单
router.post('/:id/urge', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ code: 404, msg: '订单不存在' });
  }

  // 催单后加速：直接从 pending → cooking
  if (order.status === ORDER_STATUS.PENDING) {
    order.status = ORDER_STATUS.COOKING;
    order.statusText = ORDER_STATUS_MAP[ORDER_STATUS.COOKING].text;
  }

  res.json({ code: 0, msg: '已催单，商家正在加速处理' });
});

module.exports = router;
