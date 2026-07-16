const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const typedText = document.getElementById('typed-text');
const identities = [
  'Microsoft Power Platform Developer.',
  'Sergeant in the U.S. Army Reserve.',
  'Proud husband to a future pharmacist.'
];

const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));

async function typeIdentity(text) {
  for (const character of text) {
    typedText.textContent += character;
    await wait(character === ' ' ? 42 : 66);
  }
}

async function deleteIdentity() {
  while (typedText.textContent.length) {
    typedText.textContent = typedText.textContent.slice(0, -1);
    await wait(35);
  }
}

async function rotateIdentities() {
  if (reducedMotion) {
    typedText.textContent = identities[0];
    return;
  }

  let index = 0;
  while (true) {
    await typeIdentity(identities[index]);
    await wait(1900);
    await deleteIdentity();
    await wait(350);
    index = (index + 1) % identities.length;
  }
}

rotateIdentities();

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
