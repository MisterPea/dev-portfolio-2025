import gsap from "gsap";

export const animationEnterOnce = (container: HTMLElement) => {
  const tl = gsap.timeline();
  // we're calculating height of h1 in vh
  const height = gsap.getProperty(".main_wrapper-home h1", 'height', 'vh');
  const h1Height = +(height as string).split('vh')[0];
  tl.from(".main_wrapper-home", {
    opacity: 0,
    duration: 2,
    ease: 'none',
    delay: 0.4
  });
  tl.from(".main_wrapper-home", {
    // vertical center text
    y: `${50 - (h1Height / 2)}vh`,
    transformOrigin: 'center',
    duration: 0.75,
    ease: 'power3.inOut',
  });
  tl.from(".landing-projects_section", {
    opacity: 0,
    duration: 1,
    ease: 'sine.out',
    display: 'none'
  }, ('-=0.25'));
  tl.from(".main_wrapper-home span",
    {
      opacity: 0,
      duration: 0.6,
      ease: 'none'
    }, ('-=0.7'));
  tl.from(".landing-about_section", {
    opacity: 0,
    duration: 1,
    ease: 'sine.out',
    display: 'none'
  });
  tl.from("header", {
    opacity: 0,
    duration: 1,
    ease: 'sine.out'
  }, ("-=1.2"));
  tl.from("footer", {
    opacity: 0,
    duration: 1,
    ease: 'sine.out',
    display: 'none'
  }, ("-=0.5"));
  return tl;
};

export const animationLeaveUp = (container: HTMLElement) => {
  return gsap.to(container, {
    autoAlpha: 0,
    duration: 1,
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
