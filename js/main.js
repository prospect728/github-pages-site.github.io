/* ========================================
   数字花园 — Digital Garden
   交互逻辑 · 动画 · 粒子背景
   ======================================== */

// ===== 主题切换 =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== 移动端菜单 =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== 导航高亮 =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === '#' + current);
  });
});

// ===== 数字计数动画 =====
const counters = document.querySelectorAll('.stat-num');
const animateCounter = (el) => {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
};

// ===== 滚动出现动画 =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // 触发计数器
      if (entry.target.classList.contains('hero-stats')) {
        counters.forEach(c => animateCounter(c));
      }
      // 触发技能条
      if (entry.target.classList.contains('skills-grid')) {
        document.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .hero-stats, .skills-grid').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== 项目数据 =====
const projects = [
  {
    title: '花之百科',
    desc: '一个介绍花朵的综合网站，含12种手绘 SVG 花卉、花语词典、送花指南和养花技巧。',
    tags: ['HTML', 'CSS', 'JS', 'SVG'],
    icon: '🌸',
    gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    category: 'web'
  },
  {
    title: '喵星人养护指南',
    desc: '猫咪养护知识网站，包含品种百科、饮食护理指南、年龄换算器和喂食量计算器。',
    tags: ['HTML', 'CSS', 'JS', 'SVG'],
    icon: '🐱',
    gradient: 'linear-gradient(135deg, #f6d365, #fda085)',
    category: 'web'
  },
  {
    title: '喵星球博客',
    desc: '猫咪主题个人博客，支持 Markdown 渲染、标签分类、文章详情，含浮动爪印动画。',
    tags: ['HTML', 'CSS', 'JS', 'marked.js'],
    icon: '🐾',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    category: 'web'
  },
  {
    title: '命令行工具集',
    desc: '一组实用的 CLI 工具，包括文件批量重命名、图片压缩、Markdown 转换等。',
    tags: ['Node.js', 'CLI', 'Tools'],
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    category: 'tool'
  },
  {
    title: 'API 监控面板',
    desc: '实时 API 健康监控仪表盘，可视化请求量、响应时间、错误率等指标。',
    tags: ['React', 'Chart.js', 'API'],
    icon: '📊',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    category: 'web'
  },
  {
    title: '极简设计系统',
    desc: '一套基于 CSS 变量的设计系统，包含按钮、卡片、表单等 30+ 组件。',
    tags: ['CSS', 'Design System', 'Components'],
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    category: 'design'
  }
];

// ===== 渲染项目卡片 =====
const projectGrid = document.getElementById('projectGrid');
function renderProjects(filter = 'all') {
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  projectGrid.innerHTML = filtered.map(p => `
    <article class="project-card" data-category="${p.category}">
      <div class="project-image" style="background: ${p.gradient}">
        <span style="position:relative;z-index:1">${p.icon}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <a href="#" class="project-link" onclick="event.preventDefault()">
          查看详情
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  `).join('');
}
renderProjects();

// ===== 项目筛选 =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// ===== 复制链接 =====
function copyLink(e) {
  e.preventDefault();
  navigator.clipboard.writeText(window.location.href).then(() => {
    const card = e.currentTarget;
    const orig = card.querySelector('p').textContent;
    card.querySelector('p').textContent = '链接已复制!';
    setTimeout(() => { card.querySelector('p').textContent = orig; }, 2000);
  });
}

// ===== Canvas 粒子背景 =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
    
    // 鼠标交互
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        this.x -= dx * 0.01;
        this.y -= dy * 0.01;
      }
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(88, 166, 255, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(80, Math.floor(window.innerWidth / 20));
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.strokeStyle = `rgba(88, 166, 255, ${0.15 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

console.log('%c🌿 Digital Garden', 'font-size:24px;font-weight:bold;color:#58a6ff');
console.log('%c欢迎来到我的数字花园！这个网站部署在 GitHub Pages 上。', 'font-size:14px;color:#7ee787');
