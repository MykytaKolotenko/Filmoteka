import pictureHeart from '../../../../images/heart.svg';

export default function mainFooterTemplate() {
  return `
      <div class="container footer-container">
        <p class="footer-text">
          &copy; 2022 &#124; All Rights Reserved &#124; Developed with
          <svg class="footer-text-icon" width="17px" height="16px">
            <use href="${pictureHeart}"></use>
          </svg>
          by
          <button class="modal-open-btn" type="button">GoIT Students</button>
        </p>
      </div>`;
}
