// Ensure no unnecessary animations. 
// Add a simple footer year update.
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.createElement('footer');
  footer.style.textAlign = 'center';
  footer.style.padding = '2rem 0';
  footer.style.color = '#4a5a6a';
  footer.innerHTML = `&copy; ${new Date().getFullYear()} Ujjwal Parajuli.`;
  document.body.appendChild(footer);
});
