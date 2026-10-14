const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeToggleLabel = themeToggle?.querySelector('.theme-toggle-label');

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('light-mode', !isDark);

  if (themeToggle && themeToggleLabel) {
    themeToggleLabel.textContent = isDark ? 'Light' : 'Dark';
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.firstElementChild.textContent = isDark ? '☀️' : '🌙';
  }
};

let savedTheme = 'dark';
try {
  const storedTheme = localStorage.getItem('portfolio-theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    savedTheme = storedTheme;
  }
} catch (error) {
  console.warn('Unable to read the saved theme preference:', error);
}

applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(nextTheme);

  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch (error) {
    console.warn('Unable to save the theme preference:', error);
  }
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  }); 
}

const downloadPDFSafe = (pdfPath, fileName) => {
  try {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName || 'resume.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Failed to download resume.');
  }
};

const revealTargets = document.querySelectorAll(
  '.section-header, .about-text, .about-panel, .skill-card, .detail-card, .experience-card, .education-card, .project-card, .achievement-card, .certifications-wrap, .platform, .contact-card'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element, index) => {
    element.dataset.reveal = '';
    element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  });

  document.body.classList.add('motion-ready');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -35px 0px'
  });

  revealTargets.forEach((element) => revealObserver.observe(element));
}
