// Theme toggle with localStorage
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀';
}

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  if (isDark) {
    html.removeAttribute('data-theme');
    themeToggle.textContent = '◐';
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀';
    localStorage.setItem('theme', 'dark');
  }
});

// Toast helper
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href === '#') {
      showToast('🧬 Repo under construction — check back soon!');
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Subtle reveal on scroll for cards
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.mind-card, .journey-block, .exp-card, .proof-card, .craft-col, .edu-block').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

const style = document.createElement('style');
style.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Copy email helper function
function copyEmail() {
  const email = "sparvathyofficial@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const label = document.getElementById("copy-label");
    if (label) label.textContent = "Email Copied! ✓";
    showToast("📧 Email copied to clipboard!");
    
    setTimeout(() => {
      if (label) label.textContent = "Copy Email";
    }, 2500);
  });
}

console.log('%c🧬 Curious minds welcome here.', 'color: #10b981; font-size: 14px; font-weight: bold;');
console.log('%cIf you are reading this, you already share the mindset.', 'color: #0d9488; font-size: 12px;');