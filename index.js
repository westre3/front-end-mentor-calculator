const themeSlider = document.querySelector('.theme-slider');
const themes = ['theme-1', 'theme-2', 'theme-3'];

themeSlider.addEventListener('input', () => {
  setTheme(themeSlider.value);
});

const setTheme = (themeNumber) => {
  const body = document.querySelector('body');
  themes.forEach((theme) => body.classList.remove(theme));
  body.classList.add(themes[themeNumber - 1]);
};
