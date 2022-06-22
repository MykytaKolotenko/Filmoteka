import svg from '../../../../images/symbol-defs.svg';

const footerModalTemplate = () => {
  return `<div class="footer__modal js-footer__modal">
  <div class="footer__modal-window js-footer__modal-window">
    <button class="footer__modal-close-btn">
      <svg class="footer__modal-close-btn-icon" alt="close"  width="26px" height="26px">
        <use href="${svg + '#icon-close'}"></use>
      </svg>   
    </button>
    <h2 class="modal__team-title">Our Team</h2>
    <ul class="modal__team-list js-team-list"></ul>
  </div>
</div>`;
}

export default footerModalTemplate