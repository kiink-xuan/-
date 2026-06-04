# 🍽️ 好味道餐厅 — 微信点餐小程序

> 一款界面精美、功能完整的餐厅点餐微信小程序，支持菜品浏览、规格选择、购物车管理、在线下单、订单实时跟踪等核心功能。

<div align="center">

![Platform](https://img.shields.io/badge/platform-微信小程序-green?logo=wechat)
![Language](https://img.shields.io/badge/language-JavaScript-yellow)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-blue)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

</div>

---

## 📱 功能概览

| 模块 | 功能 |
|------|------|
| **菜单浏览** | 分类筛选、关键词搜索、推荐标签、价格展示 |
| **菜品详情** | 大图展示、多规格选择（辣度/份量/口味）、数量调整 |
| **购物车** | 加减数量、实时计价、订单备注、一键清空 |
| **确认下单** | 桌号填写、用餐人数、价格明细、打包费 |
| **订单跟踪** | 四步进度条（待接单→备菜中→已上菜→已完成）、催单、状态自动推进 |
| **个人中心** | 订单统计、用户信息、快捷入口 |
| **加购动画** | 抛物线飞入购物车，触感反馈 |

## 🛠️ 技术栈

### 前端（小程序）
- **框架**：微信小程序原生框架
- **状态管理**：App 全局数据 + 本地存储持久化
- **样式**：CSS 变量体系、渐变配色、安全区域适配
- **动画**：小程序 Animation API（加购飞入动画）

### 后端（Mock Server）
- **运行环境**：Node.js
- **Web 框架**：Express
- **数据存储**：内存 + JSON 文件
- **API 设计**：RESTful 风格

## 📂 项目结构

```
餐厅点餐小程序/
├── miniprogram/                # 小程序前端
│   ├── app.js                  # 应用入口，全局状态管理
│   ├── app.json                # 页面路由 & 窗口配置
│   ├── app.wxss                # 全局样式（CSS 变量体系）
│   ├── utils/
│   │   ├── mock.js             # 模拟数据（27道菜品、5大分类）
│   │   └── util.js             # 工具函数（防抖/节流/深拷贝等）
│   ├── pages/
│   │   ├── index/              # 菜单浏览首页（分类+搜索）
│   │   ├── dish-detail/        # 菜品详情（规格选择）
│   │   ├── cart/               # 购物车（数量管理+备注）
│   │   ├── order-confirm/      # 确认下单（桌号+人数）
│   │   ├── order-list/         # 订单列表（Tab筛选）
│   │   ├── order-detail/       # 订单详情（进度条）
│   │   └── mine/               # 个人中心
│   └── images/                 # TabBar 图标
├── server/                     # Node.js 模拟后端
│   ├── index.js                # Express 服务入口
│   ├── routes/
│   │   ├── dishes.js           # 菜品相关 API
│   │   ├── orders.js           # 订单相关 API
│   │   └── upload.js           # 文件上传 API
│   └── data/
│       └── mock-data.json      # 菜品 & 订单数据
├── project.config.json         # 小程序项目配置
└── README.md
```

## 🚀 快速开始

### 1. 小程序前端

1. 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开开发者工具，导入项目目录 `餐厅点餐小程序/`
3. AppID 选择测试号或使用项目中的 AppID
4. 点击编译即可预览

### 2. 后端服务（可选）

```bash
cd server
npm install
npm start        # 启动在 http://localhost:3000
npm run dev      # 开发模式（自动重启）
```

启动后端后，在小程序 `app.js` 中修改 `baseUrl` 指向本地服务即可体验完整前后端交互。

## 🎨 界面预览

| 菜单页 | 菜品详情 | 购物车 |
|:---:|:---:|:---:|
| 分类导航 + 搜索 | 规格选择 + 数量 | 数量管理 + 备注 |

| 确认下单 | 订单跟踪 | 个人中心 |
|:---:|:---:|:---:|
| 桌号 + 人数 + 明细 | 四步进度条 | 数据统计 |

## ✨ 亮点特性

- **完整闭环**：浏览→详情→加购→下单→支付→订单跟踪，真实业务全流程
- **优雅 UI**：CSS 变量体系、渐变配色、自定义进度条、购物车浮栏
- **交互细节**：触感反馈（`wx.vibrateShort`）、加购抛物线动画、规格选中态
- **数据持久化**：基于 `wx.getStorageSync` 的购物车和订单本地缓存
- **工程化**：工具函数封装（防抖/节流/深拷贝）、模块化 mock 数据
- **响应式适配**：安全区域适配、iPhone 底部 bar 兼容

## 📸 演示录制指南

> 发给 HR 时附上一个 15–30 秒的操作录屏会大大加分。

**推荐录屏路径**（约 20 秒）：

1. **菜单页**（5s）：滑动切换分类 → 展示菜品列表
2. **加购**（3s）：点击"+"将菜品加入购物车，展示飞入动画 + 购物车角标变化
3. **下单**（5s）：进入购物车 → 去结算 → 填写桌号 → 确认下单
4. **订单跟踪**（5s）：查看订单详情 → 展示进度条和状态流转
5. **个人中心**（2s）：展示数据统计

**工具建议**：
- 微信开发者工具自带"录制 GIF"功能（工具栏 → 录制）
- 或用 [ScreenToGif](https://www.screentogif.com/)（Windows 免费）

**录好后**：将 GIF 放到项目根目录，替换上方界面预览区的占位即可。

## 📝 License

MIT © 2024
