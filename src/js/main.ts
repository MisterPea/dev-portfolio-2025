import { addObservers } from "./intersectionFunctions";
import "./renderEmail";
import initParallax from "./parallax";
import spotifyListening from "./spotifyListening";
import barba from "@barba/core";
import barbaCss from "@barba/css";

interface BarbaUrl {
  href: string;
  path: string;
  port?: number;
  query: Record<string, any>;
}

interface BarbaPage {
  container: HTMLElement;
  html: string;
  namespace: string;
  url: BarbaUrl;
}

interface BarbaEvent {
  isTrusted: boolean;
}

interface BarbaTransitionEvent {
  current: BarbaPage;
  event: BarbaEvent;
  next: BarbaPage;
  trigger: unknown;
}

/**
 * Function to look at localStorage for dark-mode preference.
 * If none is found, we check the browser.
 * Preference is written to localStorage and returned
 * @returns {'dark'|'light'} 
 */
function _getDarkModePref(): 'dark' | 'light' {
  let prefersDarkMode = (localStorage.getItem('prefersDarkMode') as 'dark' | 'light' | null);
  if (prefersDarkMode === null) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      prefersDarkMode = 'dark';
    } else {
      prefersDarkMode = 'light';
    }
    localStorage.setItem('prefersDarkMode', prefersDarkMode);
  }
  const head = document.head;
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = `${prefersDarkMode === 'dark' ? '#1e2124' : '#f5f5f5'}`;
  const html = document.querySelector('html');
  html.setAttribute('data-color-scheme', prefersDarkMode);
  head.appendChild(meta);
  return prefersDarkMode;
}

/**
 * Function called in order to toggle between light/dark, dark/light.
 * In addition to data-color-scheme we're also changing <meta> theme-color for 
 * browsers that recognize it.
 */
export function toggleDarkMode() {
  const prefersDarkMode = _getDarkModePref();
  const newValue = prefersDarkMode === 'dark' ? 'light' : 'dark';
  localStorage.setItem('prefersDarkMode', newValue);

  document.querySelector('meta[name="theme-color"]').remove();
  document.querySelector('meta[name="theme-color"]').setAttribute('content', `${newValue === 'dark' ? '#1e2124' : '#f5f5f5'}`);

  const html = document.querySelector('html');
  html.setAttribute('data-color-scheme', newValue);

  // set icon
  const sunMoon = document.querySelector('.svg-inner_div');
  if (sunMoon) {
    sunMoon.classList.remove(prefersDarkMode);
    sunMoon.classList.add(newValue);
  }
}

function initPageListeners(data: BarbaTransitionEvent) {
  const homeBtn = document.querySelector('.home-button');
  const currPath = data.next.url.path;
  addObservers('picture.lazy');
  addObservers('figure.lazy');
  initParallax();
  if (currPath === '/') {
    // only load spotify on root & add 
    spotifyListening();
    homeBtn.classList.remove('enabled');
    if (!homeBtn.classList.contains('disabled')) homeBtn.classList.add('disabled');
  } else {
    // show home button if not root 
    homeBtn.classList.remove('disabled');
    if (!homeBtn.classList.contains('enabled')) homeBtn.classList.add('enabled');
  }
}




barba.hooks.beforeEnter((e: BarbaTransitionEvent) => {
  history.scrollRestoration = 'manual';
  initPageListeners(e);
});

barba.hooks.afterLeave((e: BarbaTransitionEvent) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

barba.use(barbaCss);
barba.init({
  transitions: [{
    name: 'initial',
    once() { }
  }, {
    name: 'project',
    to: {
      namespace: ['project']
    },
    leave() { },
    enter() { }
  }, {
    name: 'home',
    to: {
      namespace: ['home']
    },
    leave() { },
    enter() { }
  }]
});


/**
 * Everything kicks off from here - Called when DOM content is ready.
 */
// window.addEventListener('load', () => {
document.addEventListener('DOMContentLoaded', () => {
  const prefersDarkMode = _getDarkModePref();
  const sunMoon = document.querySelector('.svg-inner_div') as HTMLDivElement;
  const mainDiv = document.querySelector('.main_wrapper');
  if (sunMoon) {
    sunMoon.classList.add(prefersDarkMode);
    // we're requesting animation frame to add style in between updates to
    // prevent the animation from happening on initial load
    requestAnimationFrame(() => {
      sunMoon.style.transition = 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)';
    });
  }
  const lightDarkToggleBtn = document.querySelector('.dark_mode-button');
  if (lightDarkToggleBtn) lightDarkToggleBtn.addEventListener('click', () => toggleDarkMode());



  // We want to wait two paint cycles to let our classes set
  // if (mainDiv) {
  //   requestAnimationFrame(() => {
  //     requestAnimationFrame(() => {
  //       mainDiv.classList.add("is-interactive");
  //     });
  //   });
  // }

  // initiateAnimateTransition();

});
