import svg from '../../../../images/symbol-defs.svg';

const mainFooterTemplate = () => {
  return `
      <div class="footer__box"> 
      <div class="container footer__container">
        <p class="footer__text">
          &copy; 2022 &#124; All Rights Reserved &#124; Developed with
          <svg class="footer__heart-img" alt="close"  width="14px" height="13px">
            <use href="${svg + '#icon-heart'}"></use>
          </svg>
          by
          <button class="footer__modal-open-btn" type="button">GoIT Students</button>
        </p>
      </div>
    </div>`;
}

export default mainFooterTemplate