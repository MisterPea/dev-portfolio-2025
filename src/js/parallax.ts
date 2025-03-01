const THRESHOLD = 4;

// We're mapping numbers (hor/vert) to a log curve
function mapLogarithmic(x: number, k = 10) {
  if (x <= 0) return -k; // Avoid log(0)
  return (Math.log(1 + x * (k - 1)) / Math.log(k)) * (k * 2) - k;
}

function handleHover(e: MouseEvent, card: HTMLElement) {
  const { clientX, clientY, currentTarget } = e;
  const { clientWidth, clientHeight } = currentTarget as HTMLElement;
  const offsetLeft = (currentTarget as HTMLElement).getBoundingClientRect().left;
  const offsetTop = (currentTarget as HTMLElement).getBoundingClientRect().top;
  const horizontal = (clientX - offsetLeft) / clientWidth;
  const vertical = (clientY - offsetTop) / clientHeight;
  const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
  const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);
  if (clientWidth > 717) {
    card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `rgba(0, 0, 0, 0.1) ${mapLogarithmic(horizontal)}px ${mapLogarithmic(vertical)}px 10px,rgba(0, 0, 0, 0.2) ${mapLogarithmic(horizontal, 2)}px ${mapLogarithmic(vertical, 2)}px 2px`;
  } else {
    resetStyle(e, card);
  }
}

function resetStyle(e: MouseEvent, card: HTMLElement) {
  card.style.transform = `perspective(${(e.currentTarget as HTMLElement).clientWidth}px) rotateX(0deg) rotateY(0deg)`;
  card.style.boxShadow = `rgba(0, 0, 3, 0.0) 0px 0px 0px,rgba(0, 0, 3, 0.0) 0px 0px 0px`;
}

const cards = document.querySelectorAll('article.landing-project_card');
cards.forEach((card: HTMLElement) => {
  card.addEventListener('mousemove', (e: MouseEvent) => handleHover(e, card));
  card.addEventListener('mouseleave', (e) => resetStyle(e, card));
});