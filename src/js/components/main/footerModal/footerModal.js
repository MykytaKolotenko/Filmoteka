import footerModalTemplate from './footer_modal_template.js';
import developers from '../teamCard/jsonTeam.js';
import team_template from '../teamCard/team_card_template.js';

export default class FooterModal {
  constructor() {
    this.renderFooterModalTemplate();
    this.refs = {
      body: document.querySelector('body'),
      footerModal: document.querySelector('.js-footer__modal'),
      footerModalOpenBtn: document.querySelector('.footer__modal-open-btn'),
      footerModalCloseBtn: document.querySelector('.footer__modal-close-btn'),
      teamList: document.querySelector('.js-team-list'),
    };
    this.refs.footerModalOpenBtn.addEventListener(
      'click',
      this.onOpenModal.bind(this)
    );
  }

  onOpenModal(e) {
    // e.preventDefault();
    window.addEventListener('keydown', this.onEscBtnPress.bind(this), {
      once: true,
    });
    this.refs.footerModalCloseBtn.addEventListener(
      'click',
      this.onCloseModal.bind(this),
      {
        once: true,
      }
    );
    this.refs.footerModal.addEventListener(
      'click',
      this.onModalOverlayClick.bind(this),
      {
        once: true,
      }
    );
    this.refs.footerModal.classList.add('is-open');
    this.refs.body.classList.add('is-open');
    return (this.refs.teamList.innerHTML = team_template(developers));
  }

  onCloseModal() {
    console.log('close');
    this.refs.footerModalCloseBtn.removeEventListener(
      'click',
      this.onCloseModal.bind(this)
    );
    this.refs.footerModal.removeEventListener(
      'click',
      this.onModalOverlayClick.bind(this)
    );
    window.removeEventListener('keydown', this.onEscBtnPress.bind(this));
    this.refs.footerModal.classList.remove('is-open');
    this.refs.body.classList.remove('is-open');
  }

  onModalOverlayClick(e) {
    if (e.currentTarget === e.target) {
      this.onCloseModal();
    }
  }

  onEscBtnPress(e) {
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  }

  renderFooterModalTemplate() {
    const modalTemplate = footerModalTemplate();
    document.body.insertAdjacentHTML('beforeend', modalTemplate);
  }
}
