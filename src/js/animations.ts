import gsap from "gsap";

export const animationEnterOnce = (container: HTMLElement) => {
  const tl = gsap.timeline();
  tl.from(".main_wrapper-home", {
    opacity: 0,
    duration: 2,
    ease: 'none'
  });
  tl.from(".main_wrapper-home", {
    y: '30vh',
    duration: 1,
    ease: 'expo.inOut',
  });
  tl.from(".main_wrapper-home span",
    {
      opacity: 0,
      duration: 0.6,
      ease: 'expo.inOut'
    }, ('-=0.8'));
  tl.from(".landing-projects_section", {
    opacity: 0,
    duration: 0.8,
    ease: 'sine.out',
    display: 'none'
  });
  tl.from(".landing-about_section", {
    opacity: 0,
    duration: 0.6,
    ease: 'sine.out',
    display: 'none'
  });
  tl.from("header", {
    opacity: 0,
    duration: 0.8,
    ease: 'sine.out'
  }, ("-=1.2"));
  tl.from("footer", {
    opacity: 0,
    duration: 0.8,
    ease: 'sine.out',
    display: 'none'
  }, ("-=0.5"));
  return tl;
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
