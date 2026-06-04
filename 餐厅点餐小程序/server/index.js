/**
 * server/index.js — 好味道餐厅后端服务
 *
 * 提供菜品查询、订单管理、模拟状态流转等 API
 * 启动: npm start  →  http://localhost:3000
 */

const express = require('express');
const cors = require('cors');

const dishesRouter = require('./routes/dishes');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 请求日志
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// 路由
app.use('/api/dishes', dishesRouter);
app.use('/api/orders', ordersRouter);

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({ code: 0, data: { status: 'ok', uptime: process.uptime() } });
});

// 404 处理
app.use((_req, res) => {
  res.status(404).json({ code: 404, msg: '接口不存在' });
});

// 全局错误处理
app.use((err, _req, res, _next) => {
  console.error('Server Error:', err);
  res.status(500).json({ code: 500, msg: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  🍽️  好味道餐厅后端服务已启动`);
  console.log(`  📡 地址: http://localhost:${PORT}`);
  console.log(`  📋 API:  http://localhost:${PORT}/api`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});
