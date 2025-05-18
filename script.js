// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentMode = localStorage.getItem('theme');

if (currentMode === 'dark' || (!currentMode && prefersDark)) {
  document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const topOffset = 80; // adjust if your header height changes
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    setTimeout(() => {
      alert('Message sent successfully!');
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }, 1500);
  });
}

// Skills animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const animatedBars = new Set();

function animateSkills() {
  skillBars.forEach(bar => {
    if (animatedBars.has(bar)) return;

    const position = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight * 0.85;

    if (position < screenPosition) {
      const finalWidth = bar.dataset.width || '100%';
      bar.style.width = finalWidth;
      bar.style.transition = 'width 1s ease-in-out';
      animatedBars.add(bar);
    }
  });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills); // trigger on page load too
