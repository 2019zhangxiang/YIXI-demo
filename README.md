# TRAE-V2 React B端管理系统

这是一个基于React、TypeScript、Ant Design和Vite构建的现代化管理后台模板，提供了常见的B端系统功能和最佳实践。

## 项目结构

```
├── public/              # 静态资源
├── src/                 # 源代码
│   ├── api/             # API请求
│   ├── assets/          # 项目资源文件
│   ├── components/      # 公共组件
│   ├── config/          # 全局配置
│   ├── hooks/           # 自定义hooks
│   ├── layouts/         # 布局组件
│   ├── pages/           # 页面组件
│   ├── router/          # 路由配置
│   ├── store/           # 状态管理
│   ├── styles/          # 全局样式
│   ├── types/           # TypeScript类型定义
│   ├── utils/           # 工具函数
│   ├── App.tsx          # 应用入口组件
│   ├── main.tsx         # 应用入口文件
│   └── vite-env.d.ts    # Vite类型声明
├── .eslintrc.js         # ESLint配置
├── .prettierrc          # Prettier配置
├── index.html           # HTML模板
├── package.json         # 项目依赖
├── tsconfig.json        # TypeScript配置
├── vite.config.ts       # Vite配置
└── README.md            # 项目说明
```

## 技术栈

- **框架**: React 18+, TypeScript
- **构建工具**: Vite
- **UI组件库**: Ant Design
- **路由**: React Router v6
- **状态管理**: Redux Toolkit
- **HTTP请求**: Axios
- **CSS方案**: Less + CSS Modules
- **代码规范**: ESLint + Prettier

## 功能特性

- 用户认证与权限管理
- 动态路由与菜单
- 主题定制
- 响应式布局
- 数据可视化
- 表单处理
- 列表与表格
- 国际化

## 开发指南

### 安装依赖

```bash
npm install
# 或
yarn
# 或
pnpm install
```

### 开发环境

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 构建生产环境

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

## 最佳实践

- 组件设计遵循单一职责原则
- 使用TypeScript强类型保证代码质量
- 统一的错误处理机制
- 模块化的状态管理
- 可配置的主题系统
- 完善的文档和注释