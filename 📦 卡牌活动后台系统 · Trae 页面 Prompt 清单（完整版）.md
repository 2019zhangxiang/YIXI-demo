

```
# 📦 卡牌活动后台系统 · Trae 页面 Prompt 清单（完整版）

---

## 00. 首页 Dashboard
**用途**：后台总览，KPI + 趋势 + 快捷入口。  
```

Design a “首页Dashboard” page for the backend system “卡牌活动后台管理”.

Layout:

- KPI cards: 参与人数、掉落次数、合成成功率、发奖成功率

- 趋势图: 近14天投币/掉落/合成量

- 漏斗图: 任务→领奖→合成→兑换

- 门店贡献TOP10 (柱状图)

  Style:

- Card-based UI, 微软雅黑 font, theme color deep blue (#0052CC) + teal (#36CFC9)

```
---

## 10. 活动管理

### 10-1 活动配置
```

Design an “活动配置” page for the backend system “卡牌活动后台管理”.

Layout:

- Sidebar 220px: 活动管理(选中), 配置中心, 发奖机制, 数据与日志, 风控与异常, 系统设置.
- Top bar: breadcrumb “活动管理 / 活动配置”, actions: 保存, 发布.

Main content: form layout.

Fields:

- 活动名称 [TextInput, required]
- 活动时间 [DateRangePicker]
- 适用门店 [MultiSelect: 全部/部分]
- 展示顺序 [NumberInput]
- 前端展示开关 [Switch]
- 活动说明 [RichText]
- 状态 [Switch: 启用/停用]

Validation:

- 活动名称必填
- 时间范围必选
- 门店至少1个

Style:

- Card-based, 微软雅黑, theme #0052CC + #36CFC9

```
---

## 20. 配置中心

### 20-1 卡池配置
```

Design a “卡池配置” page for the backend system “卡牌活动后台管理”.

Layout:

- Sidebar 220px: 配置中心(选中).
- Top bar: breadcrumb “配置中心 / 卡池配置”, actions: 保存, 发布.

Main content: two tabs.

Tab 1: 卡牌配置

- Table: 卡牌ID, 名称, 图片, 稀有度, 掉落概率%, 状态, 操作
- 编辑抽屉: 名称, 上传图片, 稀有度[Select: 普通/稀有/传说], 概率, 描述, 状态[Switch]

Tab 2: 碎片配置

- Table: 碎片ID, 名称, 图片, 所属卡牌, 掉落概率%, 状态, 操作
- 编辑抽屉: 名称, 上传图片, 所属卡牌[Select], 概率, 描述, 状态

Validation:

- 概率合计需=100%
- 图片必传

Style:

- Card-based, 微软雅黑, theme #0052CC + #36CFC9

```
---

### 20-2 掉落规则
```

Design a “掉落规则设置” page for the backend system “卡牌活动后台管理”.

Layout:

- Sidebar 220px: 配置中心(选中).
- Top bar: breadcrumb “配置中心 / 掉落规则”, actions: 保存, 发布.

Main content: tabs.

Tab 1: 投币掉落

- Table: 规则ID, 适用门店/机台, 投币阈值, 掉落对象, 概率%, 每日上限, 状态, 操作
- 抽屉: 新增/编辑 → 适用范围, 阈值, 掉落对象, 概率, 上限, 状态

Tab 2: 任务掉落

- Table: 任务ID, 类型, 完成条件, 奖励, 概率%, 状态, 操作

Tab 3: 签到/分享掉落

- Table: 渠道, 次数, 掉落对象, 概率%, 状态, 操作

Validation:

- 所有概率合计必须=100%


```
---

### 20-3 用户任务
```

Design a “用户任务配置” page for the backend system “卡牌活动后台管理”.

Layout:

- Sidebar 220px: 配置中心(选中).
- Top bar: breadcrumb “配置中心 / 用户任务”, actions: 新增任务, 批量导入, 导出模板.

Main content: table.

Table columns:

- 任务ID, 名称, 类型[每日/累计], 条件, 阈值, 奖励内容, 有效期, 状态, 操作

Drawer editor:

- 名称, 类型, 条件, 阈值, 奖励内容, 有效期, 前端展示开关, 状态

Validation:

- 名称必填, 阈值>0, 奖励必填


```
---

### 20-4 卡牌合成
```

Design a “卡牌合成逻辑” page for the backend system “卡牌活动后台管理”.

Layout:

- Sidebar 220px: 配置中心(选中).
- Top bar: breadcrumb “配置中心 / 卡牌合成”, actions: 保存, 发布.

Main content: table.

Table columns:

- 合成ID, 目标卡牌, 所需碎片, 成功率, 保底机制, 失败返还, 状态, 操作

Drawer:

- 目标卡牌[Select], 碎片数[Number], 成功率%, 保底机制[Select], 失败返还策略[Select], 状态[Switch]


```
---

### 20-5 图鉴展示配置
```

Design a “图鉴展示配置” page for the backend system “卡牌活动后台管理”.

Layout:

- Sidebar 220px: 配置中心(选中).
- Top bar: breadcrumb “配置中心 / 图鉴展示”, actions: 保存配置, 预览前端.

Main content: tabs.

Tab 1: 展示逻辑

- 排序规则, 显示模式, 字段选择, 详情页开关

Tab 2: 获得状态

- 已获得: 全彩
- 未获得: 灰度+锁图标
- 提示语编辑

Tab 3: 前端入口

- 标题, 副标题, 按钮文案, 图标上传, 排序权重


```
---

## 30. 发奖机制

### 30-1 奖励发放配置
```

Design a “奖励发放配置” page for the backend system “卡牌活动后台管理”.

Tabs:

1. 触发规则

   - Table: 规则ID, 类型, 条件, 奖励, 到账方式, 状态, 操作
   - 抽屉: 触发条件、奖励内容、到账方式、有效期、状态

2. 发放策略

   - 去重策略, 重试次数, 单用户上限, 高价值奖励审批, 通知方式

```
---

### 30-2 奖品库存与审核
```

Design a “奖品库存与审核” page for the backend system “卡牌活动后台管理”.

Sections:

- 库存总览: 电子币、碎片、卡牌、券、实物
- 出入库记录: 表格
- 待审核: 表格+审批弹窗
- 发放失败: 表格+重试

Right Drawer: 入库表单, 支持卡密导入

```
---

## 40. 风控与异常

### 40-1 概率验证器
```

Design a “概率验证器” page for the backend system “卡牌活动后台管理”.

Sections:

- 配置选择: 活动, 版本, 维度, 模拟次数
- 理论概率表
- 模拟结果表+图表
- 统计分析: 偏差、卡方检验、结论
- 报告导出: PDF/Excel

```
---

### 40-2 风控监控
```

Design a “风控监控模块” page for the backend system “卡牌活动后台管理”.

Dashboard:

- KPI卡: 今日预警、黑名单、异常合成、异常掉落
- 折线图: 7天异常趋势
- 饼图: 风险类型分布

Table: 预警列表 (ID, 用户, 风险类型, 时间, 状态, 操作)

Side Drawer: 策略配置 (阈值, 策略开关, 预警级别)

```
---

### 40-3 异常处理中心
```

Design an “异常处理中心” page for the backend system “卡牌活动后台管理”.

Tabs:

1. 发奖失败: Table, 批量补发
2. 掉落异常: Table, 标记正常/拉黑
3. 合成异常: Table, 冻结/拉黑
4. 用户申诉: 工单表, 右侧详情抽屉

Right Drawer: 工单详情, 快捷操作, 处理备注, 确认按钮

```
---

## 50. 数据与日志

### 50-1 活动数据报表
```

Design an “活动数据报表” page for the backend system “卡牌活动后台管理”.

Layout:

- KPI Cards
- 趋势图: 投币/掉落/合成
- 门店贡献柱状图
- 饼图+漏斗
- 明细表 (日期、投币、掉落、合成、领奖)
- 右侧诊断预警 (概率偏移、库存预警、异常峰值)

```
---

### 50-2 操作日志审计
```

Design an “操作日志审计” page for the backend system “卡牌活动后台管理”.

Table columns:

- 日志ID, 操作人, 模块, 操作内容, 原值→新值, 时间, IP, 状态

Filter:

- 操作人, 模块, 时间范围, 搜索框

Extra:

- diff 高亮, 导出 CSV/XLSX, Tooltip 显示原始请求

```
---

## 60. 系统设置
```

Design a “系统设置” page for the backend system “卡牌活动后台管理”.

Tabs:

1. 组织与权限: 用户列表+模板
2. 门店与机台: 门店/机台管理, 导入导出
3. 消息模板: 站内信/订阅/短信, 模板编辑
4. 开发者配置: API Key, Webhook, 回调日志

```
---

# 📑 使用说明
- 文件名：`CardGame_Backend_Prompts.md`
- 导入顺序：10 → 20 → 30 → 40 → 50 → 60
- Design tokens: 微软雅黑、主色 #0052CC、辅色 #36CFC9
- Mock 数据：使用 JSON 填充 KPI/趋势/门店/漏斗/风险  
```

------