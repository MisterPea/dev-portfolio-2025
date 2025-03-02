export default function initiateAnimateTransition() {
  const pageWrapper: HTMLDivElement = document.querySelector('.main_wrapper');
  console.log('MA-NEWER');

  document.querySelectorAll('.project-anchor').forEach((link: HTMLAnchorElement) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');

      if (pageWrapper) {
        pageWrapper.addEventListener('animationend', () => window.location.href = href, { once: true }); // reroute
        pageWrapper.classList.add('fade-out');
      }
    });
  });
}