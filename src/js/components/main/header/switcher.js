export default class Switcher {
  constructor() {
    this.refs = {
      checkboxBtn: document.querySelector('#theme-switch-toggle'),
      body: document.querySelector('body'),
      modalFilm: document.querySelector('.modal'),
      modal: document.querySelector('.footer__modal-window'),
      footer: document.querySelector('.footer'),
    };
    this.theme = {
      LIGHT: 'light-theme',
      DARK: 'dark-theme',
    };

    this.changeTheme();
  }

  changeTheme() {
    const { LIGHT, DARK } = this.theme;

    this.refs.checkboxBtn.addEventListener('change', onChangeTheme.bind(this));

    function onChangeTheme(e) {
      const theme = e.target.checked;
      if (theme) {
        this.refs.body.classList.add(DARK);
        this.refs.modalFilm.classList.add(DARK);
        this.refs.modal.classList.add(DARK);
        this.refs.footer.classList.add(DARK);

        this.refs.body.classList.remove(LIGHT);
        this.refs.modalFilm.classList.remove(LIGHT);
        this.refs.modal.classList.remove(LIGHT);
        this.refs.footer.classList.remove(LIGHT);

        localStorage.setItem('theme', DARK);
      } else {
        this.refs.body.classList.add(LIGHT);
        this.refs.modalFilm.classList.add(LIGHT);
        this.refs.modal.classList.add(LIGHT);
        this.refs.footer.classList.add(LIGHT);

        this.refs.body.classList.remove(DARK);
        this.refs.modalFilm.classList.remove(DARK);
        this.refs.modal.classList.remove(DARK);
        this.refs.footer.classList.remove(DARK);

        localStorage.setItem('theme', LIGHT);
      }
    }

    let theme = localStorage.getItem('theme');

    if (!theme) {
      theme = LIGHT;
      localStorage.setItem('theme', theme);
    }

    this.refs.body.classList.add(theme);
    this.refs.modalFilm.classList.add(theme);
    this.refs.footer.classList.add(theme);
    this.refs.modal.classList.add(theme);

    this.refs.checkboxBtn.checked = theme === LIGHT ? false : true;
  }
}
