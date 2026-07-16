const typedText = document.getElementById('typed-text');
const identities = [
  'Power Platform Developer.',
  'U.S. Army Reserve Sergeant.',
  'M.S. AI & ML Student.'
];

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function rotateIdentities() {
  let index = 0;
  while (true) {
    for (const char of identities[index]) {
      typedText.textContent += char;
      await wait(66);
    }
    await wait(2000);
    while (typedText.textContent.length > 0) {
      typedText.textContent = typedText.textContent.slice(0, -1);
      await wait(35);
    }
    index = (index + 1) % identities.length;
  }
}

rotateIdentities();

// Header scroll effect and menu logic from your previous implementation
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Intersection Observer for .reveal classes
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
