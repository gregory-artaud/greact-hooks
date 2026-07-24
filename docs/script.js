const navigation = document.querySelector('.hero__links');
const toggleButton = document.querySelector('.hero__menu');
const yearSlot = document.getElementById('year');
const installButton = document.querySelector('[data-copy]');
const toast = document.querySelector('.toast');

if (toggleButton && navigation) {
  toggleButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      toggleButton.setAttribute('aria-expanded', 'false');
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

if (installButton && toast) {
  installButton.addEventListener('click', async () => {
    const command = installButton.dataset.copy;

    try {
      await navigator.clipboard.writeText(command);
      toast.textContent = `Copied: ${command}`;
    } catch {
      toast.textContent = command;
    }

    toast.classList.add('is-visible');
    window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
  });
}
