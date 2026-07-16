/*
const text = "Hi!, I am Ujjwal Parajuli, a full stack developer.";

const textContainer = document.getElementById("typewriter-text");

function typeWriter(text, i) {
  if (i < text.length) {
    textContainer.innerHTML += text.charAt(i);
    const audio = new Audio("keyboard_sound.mp3");
    audio.play();
    setTimeout(function () {
      typeWriter(text, i + 1);
    }, 100); // Adjusting the typing speed here (milliseconds)
  }
}

// Starting the typing animation when the page loads
window.onload = function () {
  typeWriter(text, 0);
};
*/
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const closeMenu = () => {
  menuButton.classList.remove('active');
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  document.body.style.overflow = '';
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu();
    return;
  }

  menuButton.classList.add('active');
  navLinks.classList.add('open');
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Close navigation');
  document.body.style.overflow = 'hidden';
});

document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));

if (reducedMotion) {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

document.getElementById('year').textContent = new Date().getFullYear();
