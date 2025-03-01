export default function initiateAnimateTransition() {
  const pageWrapper: HTMLDivElement = document.querySelector('.main_wrapper');

  function navigateWithAnimation(href: string, pushState: boolean = true) {
    if (pageWrapper) {

      pageWrapper.addEventListener('animationend', () => {
        setTimeout(() => {

          if (pushState) {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "instant"
            });
            // history.pushState(null, '', href);
          }
          window.location.href = href;
          pageWrapper.classList.remove('is-interactive');
        }, 10);
      }, { once: true });

      pageWrapper.classList.add('fade-out');
    }
  }

  // Handle anchor clicks
  document.querySelectorAll('.project-anchor').forEach((link: HTMLAnchorElement) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      if (href) navigateWithAnimation(href);
    });
  });

  // Handle back/forward button
  window.addEventListener('popstate', () => {
    pageWrapper.classList.add('fade-out');
    pageWrapper.classList.remove('is-interactive');
    const href = location.pathname;
    history.pushState(null, '', href);
    navigateWithAnimation(href);
  });
}