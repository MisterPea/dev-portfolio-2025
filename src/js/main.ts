import { once } from "node:events";
import initiateAnimateTransition from "./animateTransition";
import { addObservers } from "./intersectionFunctions";
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

/**
 * Everything kicks off from here - Called when DOM content is ready.
 */

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

  addObservers('picture.lazy');
  addObservers('figure.lazy');

  if (mainDiv) {
    window.setTimeout(() => {
      mainDiv.classList.add("is-interactive");
    }, 0, { once: true });
  }

  initiateAnimateTransition();

});