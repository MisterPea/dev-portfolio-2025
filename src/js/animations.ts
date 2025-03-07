import gsap from "gsap";

export const animationEnterOnce = (container: HTMLElement) => {
  return gsap.from(container, {
    autoAlpha: 0,
    duration: 2,
    clearProps: 'all',
    ease: 'none'
  });
};

export const animationLeaveUp = (container: HTMLElement) => {
  return gsap.to(container, {
    autoAlpha: 0,
    duration: 0.8,
    clearProps: 'all',
    ease: 'expo.in',
    yPercent: -10,
  });
};

export const animationEnterUp = (container: HTMLElement) => {
  return gsap.from(container, {
    opacity: 0,
    yPercent: 15,
    clearProps: 'all',
    ease: 'expo.out',
    duration: 1.2,
  });
};
