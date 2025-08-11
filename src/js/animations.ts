import gsap from "gsap";

export const animationEnterOnce = (container: HTMLElement) => {
  const tl = gsap.timeline();
  // we're calculating height of h1 in vh
  const height = gsap.getProperty(".main_wrapper-home h1", 'height', 'vh');
  const h1Height = +(height as string).split('vh')[0];
  tl.fromTo(".main_wrapper-home", {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
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
  tl.fromTo(".landing-projects_section", {

    autoAlpha: 0
  }, {
    autoAlpha: 1,
    duration: 1,
    ease: 'sine.out',
  }, ('-=0.25'));

  tl.from(".main_wrapper-home span",
    {
      opacity: 0,
      duration: 0.6,
      ease: 'none'
    }, ('-=0.7'));

  tl.fromTo(".landing-about_section", {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    duration: 1,
    ease: 'sine.out',
  });

  tl.fromTo("header", {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    duration: 1,
    ease: 'sine.out'
  }, ("-=1.2"));

  tl.fromTo("footer", {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    opacity: 0,
    duration: 1,
    ease: 'sine.out',
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
  return gsap.fromTo(container, {
    opacity: 0,
    yPercent: 15,
  }, {
    autoAlpha: 1,
    clearProps: 'all',
    ease: 'expo.out',
    duration: 1.2,
    yPercent: 0,
  });
};
