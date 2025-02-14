const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      const tagName = entry.target.tagName;
      // detect if we're loading picture, video, or other
      if (tagName === 'PICTURE') {
        applyImageIntersection(entry.target as HTMLPictureElement);
      }
      obs.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '10px',
  threshold: 0.1,
});

export function applyVideoIntersection() {

}


function applyImageIntersection(target: HTMLPictureElement) {
  const sources: HTMLSourceElement[] = [...target.querySelectorAll('source')];
  const imgElement: HTMLImageElement = target.querySelector('img');
  const placeholder: HTMLDivElement = target.querySelector('.placeholder');

  // To defer loading, all properties are stored as `data-xxx`
  // To load we swap all `data-xxx` for their non-data equivalent:
  // e.g. `data-src` becomes `src` — `data-srcset`  becomes `srcset`
  sources.forEach((source) => {
    const dataSrcset = source.getAttribute('data-srcset');
    if (dataSrcset) {
      source.setAttribute('srcset', dataSrcset);
      source.removeAttribute('data-srcset');
    }
  });

  const dataSrc = imgElement.getAttribute('data-src');
  const dataAlt = imgElement.getAttribute('data-alt');
  const dataHeight = imgElement.getAttribute('data-height');
  const dataWidth = imgElement.getAttribute('data-width');

  if (dataSrc && dataAlt && dataHeight && dataWidth) {
    // Initiate adding of the image to the DOM
    imgElement.addEventListener('load', () => {
      placeholder.style.opacity = '0';
      handlePlaceholderRemoval(placeholder);
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

// Remove placeholder div after transitionend of main element
function handlePlaceholderRemoval(placeholder: HTMLDivElement) {
  placeholder.addEventListener('transitionend', () => {
    placeholder.remove();
  }, { once: true });
}

export function addObservers(tagOrClass: string) {
  document.querySelectorAll(tagOrClass).forEach((element) => {
    observer.observe(element);
  });
}