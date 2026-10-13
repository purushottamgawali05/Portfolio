const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

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

if (!document.body.classList.contains('dark-mode')) {
  document.body.classList.add('dark-mode');
}
