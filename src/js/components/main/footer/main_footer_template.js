import pictureHeart from '../../../../images/heart.svg';

export default function mainFooterTemplate() {
  return `
      <div class="container footer__container">
        <p class="footer__text">
          &copy; 2022 &#124; All Rights Reserved &#124; Developed with
           <img class="heart" src="${pictureHeart}" width="14" height="13" />
          by
          <button class="footer__modal-open-btn" type="button">GoIT Students</button>
        </p>
      </div>`;
}
