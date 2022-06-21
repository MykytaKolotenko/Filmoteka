const checkboxBtn = document.querySelector('#theme-switch-toggle');
console.log(checkboxBtn);
const body = document.querySelector('body');
const modal = document.querySelector('.footer__modal-window');
const footer = document.querySelector('.footer');
const modalFilm = document.querySelector('.modal');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const { LIGHT, DARK } = Theme;

checkboxBtn.addEventListener('change', changeTheme);

function changeTheme(e) {
  const theme = e.target.checked;
  if (theme) {
    body.classList.add(DARK);
    // footer__modal-window.classList.add(DARK);
    // modal.classList.add(DARK);
    // footer.classList.add(DARK);

    body.classList.remove(LIGHT);
    // footer__modal-window.classList.remove(LIGHT);
    // modal.classList.remove(LIGHT);
    // footer.classList.remove(LIGHT);

    localStorage.setItem('theme', DARK);
  } else {
    body.classList.add(LIGHT);
    // footer__modal-window.classList.add(LIGHT);
    // modal.classList.add(LIGHT);
    // footer.classList.add(LIGHT);

    body.classList.remove(DARK);
    // footer__modal-window.classList.remove(DARK);
    // modal.classList.remove(DARK);
    // footer.classList.remove(DARK);

    localStorage.setItem('theme', LIGHT);
  }
}

let theme = localStorage.getItem('theme');

if (!theme) {
  theme = LIGHT;
  localStorage.setItem('theme', theme);
}
body.classList.add(theme);
footer__modal-window.classList.add(theme);
modal.classList.add(theme);
footer.classList.add(theme);

checkboxBtn.checked = theme === LIGHT ? false : true;