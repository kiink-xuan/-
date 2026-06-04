/**
 * server/data/mock-data.js — 菜品与订单模拟数据
 */

const categories = [
  { id: 1, name: '招牌热菜', icon: '🔥', desc: '大厨推荐，桌桌必点' },
  { id: 2, name: '爽口凉菜', icon: '🥗', desc: '新鲜时蔬，开胃爽口' },
  { id: 3, name: '滋补汤品', icon: '🍲', desc: '文火慢炖，营养美味' },
  { id: 4, name: '主食小吃', icon: '🍚', desc: '米饭面点，应有尽有' },
  { id: 5, name: '酒水饮品', icon: '🥤', desc: '鲜榨果汁，精选好茶' }
];

const dishes = [
  // ---- 招牌热菜 ----
  { id: 101, categoryId: 1, name: '宫保鸡丁', price: 38, originalPrice: 48, image: '🍗', desc: '精选鸡腿肉，配以花生米、干辣椒爆炒，麻辣鲜香，口感嫩滑。', sales: 2568, recommend: true, specs: [{ name: '辣度', options: ['微辣', '中辣', '特辣'] }], tags: ['招牌', '人气'] },
  { id: 102, categoryId: 1, name: '鱼香肉丝', price: 32, originalPrice: 38, image: '🥩', desc: '猪里脊肉切丝，配木耳、胡萝卜、青椒，鱼香汁调味，酸甜微辣。', sales: 1832, recommend: true, specs: [], tags: ['下饭'] },
  { id: 103, categoryId: 1, name: '麻婆豆腐', price: 22, originalPrice: 28, image: '🧈', desc: '嫩豆腐配牛肉末，正宗川味麻婆豆腐，麻辣烫香，嫩滑入味。', sales: 1520, recommend: false, specs: [{ name: '辣度', options: ['微辣', '中辣', '特辣'] }], tags: ['川味', '素菜'] },
  { id: 104, categoryId: 1, name: '糖醋里脊', price: 42, originalPrice: 52, image: '🍖', desc: '猪里脊肉裹薄糊炸至金黄，浇上自制糖醋汁，外酥里嫩，酸甜可口。', sales: 1356, recommend: true, specs: [], tags: ['人气', '酸甜'] },
  { id: 105, categoryId: 1, name: '红烧排骨', price: 58, originalPrice: 68, image: '🦴', desc: '精选猪小排，慢火红烧，酱香浓郁，骨肉分离，入口即化。', sales: 1120, recommend: false, specs: [{ name: '份量', options: ['小份（6块）', '大份（10块）'] }], tags: ['硬菜'] },
  { id: 106, categoryId: 1, name: '干锅花菜', price: 28, image: '🥬', desc: '有机花菜配五花肉片，干锅烹制，焦香四溢，微辣鲜香。', sales: 980, recommend: false, specs: [], tags: ['素菜', '微辣'] },
  { id: 107, categoryId: 1, name: '水煮鱼片', price: 68, originalPrice: 78, image: '🐟', desc: '鲜嫩黑鱼片，配豆芽、莴笋，川味水煮，麻辣鲜嫩，分量十足。', sales: 890, recommend: true, specs: [{ name: '辣度', options: ['微辣', '中辣', '特辣'] }], tags: ['川味', '海鲜'] },
  // ---- 爽口凉菜 ----
  { id: 201, categoryId: 2, name: '拍黄瓜', price: 16, image: '🥒', desc: '新鲜黄瓜拍碎，蒜泥、香醋、辣椒油凉拌，清脆爽口，解腻开胃。', sales: 2100, recommend: false, specs: [], tags: ['清爽'] },
  { id: 202, categoryId: 2, name: '凉拌木耳', price: 18, originalPrice: 22, image: '🍄', desc: '东北黑木耳，配香菜、蒜末、辣椒油凉拌，口感脆嫩，营养丰富。', sales: 1560, recommend: false, specs: [], tags: ['健康'] },
  { id: 203, categoryId: 2, name: '口水鸡', price: 36, originalPrice: 42, image: '🐔', desc: '三黄鸡煮至刚熟，浇上秘制红油酱汁，麻辣鲜香，让人口水直流。', sales: 1230, recommend: true, specs: [{ name: '辣度', options: ['微辣', '中辣', '特辣'] }], tags: ['人气', '川味'] },
  { id: 204, categoryId: 2, name: '皮蛋豆腐', price: 15, image: '🥚', desc: '内酯豆腐配松花蛋，淋上香油、生抽，冰凉嫩滑，经典凉菜。', sales: 1800, recommend: false, specs: [], tags: ['经典'] },
  // ---- 滋补汤品 ----
  { id: 301, categoryId: 3, name: '番茄蛋花汤', price: 18, originalPrice: 22, image: '🍅', desc: '新鲜番茄熬制汤底，打入蛋花，酸甜可口，家常味道。', sales: 1650, recommend: false, specs: [{ name: '规格', options: ['小份', '大份'] }], tags: ['家常'] },
  { id: 302, categoryId: 3, name: '酸辣汤', price: 22, image: '🥣', desc: '豆腐、木耳、鸡蛋、肉丝，酸辣浓郁，暖胃驱寒，一碗下肚浑身舒畅。', sales: 1340, recommend: false, specs: [{ name: '规格', options: ['小份', '大份'] }], tags: ['暖胃'] },
  { id: 303, categoryId: 3, name: '菌菇鸡汤', price: 48, originalPrice: 58, image: '🍲', desc: '土鸡配多种菌菇，文火慢炖 4 小时，汤色金黄，鲜美滋补。', sales: 780, recommend: true, specs: [{ name: '规格', options: ['小份（1-2人）', '大份（3-4人）'] }], tags: ['滋补', '人气'] },
  { id: 304, categoryId: 3, name: '冬瓜排骨汤', price: 38, originalPrice: 45, image: '🍖', desc: '猪排骨配冬瓜，清炖至汤白肉烂，清淡鲜美，夏季消暑佳品。', sales: 620, recommend: false, specs: [], tags: ['清淡'] },
  // ---- 主食小吃 ----
  { id: 401, categoryId: 4, name: '蛋炒饭', price: 18, image: '🍚', desc: '粒粒分明的蛋炒饭，配火腿丁、青豆、胡萝卜，简单却美味。', sales: 2300, recommend: false, specs: [{ name: '规格', options: ['小份', '大份'] }], tags: ['经典'] },
  { id: 402, categoryId: 4, name: '手工水饺', price: 28, originalPrice: 35, image: '🥟', desc: '每天现包，皮薄馅大。猪肉白菜/韭菜鸡蛋两种馅可选，一份 15 个。', sales: 1450, recommend: true, specs: [{ name: '馅料', options: ['猪肉白菜', '韭菜鸡蛋'] }], tags: ['手工', '人气'] },
  { id: 403, categoryId: 4, name: '阳春面', price: 15, image: '🍜', desc: '简单朴素的一碗面，猪油、葱花、酱油汤底，面条筋道，暖心暖胃。', sales: 1980, recommend: false, specs: [], tags: ['清淡'] },
  { id: 404, categoryId: 4, name: '炸酱面', price: 24, originalPrice: 30, image: '🍝', desc: '老北京风味炸酱面，肉末炸酱配黄瓜丝、豆芽、萝卜丝，酱香浓郁。', sales: 1100, recommend: false, specs: [], tags: ['北京风味'] },
  { id: 405, categoryId: 4, name: '葱油饼', price: 12, image: '🫓', desc: '层层酥脆的葱油饼，现烙现卖，外酥里软，葱香四溢。', sales: 1670, recommend: false, specs: [], tags: ['小吃'] },
  // ---- 酒水饮品 ----
  { id: 501, categoryId: 5, name: '冰镇酸梅汤', price: 10, image: '🧃', desc: '古法熬制酸梅汤，冰镇后酸甜解暑，吃辣必备。', sales: 2800, recommend: false, specs: [], tags: ['冰饮', '解辣'] },
  { id: 502, categoryId: 5, name: '鲜榨橙汁', price: 18, originalPrice: 22, image: '🍊', desc: '新鲜橙子现榨，不加糖不加水，纯正果汁，满满维C。', sales: 1350, recommend: true, specs: [], tags: ['鲜榨'] },
  { id: 503, categoryId: 5, name: '龙井绿茶', price: 25, image: '🍵', desc: '明前西湖龙井，一壶配两杯，清香甘醇，饭后消食。', sales: 890, recommend: false, specs: [], tags: ['热饮'] },
  { id: 504, categoryId: 5, name: '青岛啤酒', price: 12, image: '🍺', desc: '经典青岛啤酒，冰镇爽口，配菜绝佳。', sales: 2100, recommend: false, specs: [], tags: ['酒精'] },
  { id: 505, categoryId: 5, name: '可乐/雪碧', price: 8, image: '🥤', desc: '冰镇碳酸饮料，快乐肥宅水。', sales: 3200, recommend: false, specs: [{ name: '口味', options: ['可口可乐', '雪碧', '芬达'] }], tags: ['软饮'] }
];

const ORDER_STATUS = {
  PENDING: 'pending', COOKING: 'cooking', SERVED: 'served', DONE: 'done'
};

const ORDER_STATUS_MAP = {
  'pending':  { text: '待接单', color: '#FFB300', icon: '📋', step: 0 },
  'cooking':  { text: '备菜中', color: '#FF6B35', icon: '👨‍🍳', step: 1 },
  'served':   { text: '已上菜', color: '#07C160', icon: '🍽️', step: 2 },
  'done':     { text: '已完成', color: '#999999', icon: '✅', step: 3 }
};

const orders = [];

module.exports = { categories, dishes, orders, ORDER_STATUS, ORDER_STATUS_MAP };
