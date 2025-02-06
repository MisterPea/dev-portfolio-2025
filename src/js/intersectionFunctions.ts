export const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      applyImageIntersection(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '10px',
  threshold: 0.1,
});


export function applyImageIntersection(target) {
  const sources: HTMLSourceElement[] = target.querySelectorAll('source');
  const imgElement: HTMLImageElement = target.querySelector('img');
  const placeholder: HTMLDivElement = target.querySelector('.placeholder');

  // Swap <source> srcset;
  sources.forEach((source) => {
    const dataSrcset = source.getAttribute('data-srcset');
    if (dataSrcset) {
      source.setAttribute('srcset', dataSrcset);
      source.removeAttribute('data-srcset');
    }
  });

  // Swap <img> src
  const dataSrc = imgElement.getAttribute('data-src');
  const dataAlt = imgElement.getAttribute('data-alt');
  const dataHeight = imgElement.getAttribute('data-height');
  const dataWidth = imgElement.getAttribute('data-width');

  if (dataSrc && dataAlt && dataHeight && dataWidth) {
    imgElement.addEventListener('load', () => {
      placeholder.style.opacity = '0';
    }, { 'once': true });

    imgElement.setAttribute('src', dataSrc);
    imgElement.setAttribute('alt', dataAlt);
    imgElement.setAttribute('height', dataHeight);
    imgElement.setAttribute('width', dataWidth);

    imgElement.removeAttribute('data-src');
    imgElement.removeAttribute('data-alt');
    imgElement.removeAttribute('data-height');
    imgElement.removeAttribute('data-width');
  }

  target.classList.add('visible');
}

export function addObservers(tagOrClass: string) {
  document.querySelectorAll(tagOrClass).forEach((element) => {
    observer.observe(element);
  });
}