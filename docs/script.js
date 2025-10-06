const navigation = document.querySelector('.hero__links');
const toggleButton = document.querySelector('.hero__menu');
const yearSlot = document.getElementById('year');

if (toggleButton && navigation) {
  toggleButton.addEventListener('click', () => {
    navigation.classList.toggle('is-open');
  });

  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
    });
  });
}

if (yearSlot) {
  yearSlot.textContent = String(new Date().getFullYear());
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId) return;

    const destination = document.querySelector(targetId);
    if (!destination) return;

    event.preventDefault();
    destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
