# 🌿 Digital Garden — 数字花园

一个专为 **GitHub Pages** 设计的现代静态网站。纯 HTML / CSS / JavaScript，零框架零依赖，开箱即用。

## ✨ 特性

- 🎨 **暗色/亮色双主题** — 一键切换，自动记忆偏好
- 🌌 **粒子背景** — Canvas 交互式粒子动画，鼠标可推动
- 📱 **完全响应式** — 手机 / 平板 / 桌面端完美适配
- ⚡ **滚动动画** — IntersectionObserver 驱动的入场动画
- 📊 **动态计数器** — 数字滚动动画
- 🎯 **技能进度条** — 滚动到视图时自动填充
- 🗂️ **项目筛选** — 分类标签切换
- 🧭 **智能导航** — 滚动高亮 + 平滑滚动
- 📝 **代码高亮窗口** — macOS 风格代码展示

## 📁 项目结构

```
github-pages-site/
├── index.html              # 主页面
├── css/
│   └── style.css           # 全部样式（含主题变量）
├── js/
│   └── main.js             # 交互逻辑 + 粒子动画
├── .nojekyll               # 禁用 Jekyll 处理
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 自动部署
└── README.md
```

## 🚀 部署到 GitHub Pages

### 方式一：GitHub Actions 自动部署（推荐）

1. 在 GitHub 上创建新仓库
2. 将代码推送到 `main` 分支
3. 进入仓库 **Settings → Pages**
4. **Source** 选择 **GitHub Actions**
5. 推送代码后会自动触发部署，几分钟后即可访问

```bash
git init
git add .
git commit -m "Initial commit: Digital Garden"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

### 方式二：直接用 Pages 分支

1. 将代码推送到仓库
2. 进入 **Settings → Pages**
3. **Source** 选择 **Deploy from a branch**
4. 选择 `main` 分支 + `/ (root)` 目录
5. 点击 Save，等待部署完成

## 🔧 自定义

| 想修改什么 | 去哪里改 |
|-----------|---------|
| 主题颜色 | `css/style.css` 顶部的 CSS 变量 |
| 项目内容 | `js/main.js` 的 `projects` 数组 |
| 个人介绍 | `index.html` About 区域 |
| 技能数据 | `index.html` Skills 区域 |
| 联系方式 | `index.html` Contact 区域 |

## 📜 License

MIT — 随意使用，欢迎修改！
