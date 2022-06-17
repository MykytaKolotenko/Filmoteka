import pictureClose from '../../../../images/close.svg';

export default function footerModalTemplate() {
  return `<div class="footer__modal js-footer__modal">
  <div class="footer__modal-window js-footer__modal-window">
    <button class="footer__modal-close-btn">
      <img
        class="footer__modal-close-btn-icon"
        src="${pictureClose}"
        alt=""
        width="26px"
        height="26px"
      />
    </button>
    <h2 class="modal__team-title">Our Team</h2>
    <ul class="modal__team-list js-team-list"></ul>
  </div>
</div>`;
}