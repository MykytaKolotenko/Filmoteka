export default class Loader {
  constructor() {}
  renderLoaderSquare() {
    const loaderTemplateSquare = `<div class="loader__square-box">
      <div class="loader__square" style="--f: 60px">
    <div class="loader__square-item"></div>
    <div class="loader__square-item"></div>
    <div class="loader__square-item"></div>
    </div>
    </div>`;
    const bodyBox = document.querySelector('body');
    bodyBox.insertAdjacentHTML('afterbegin', loaderTemplateSquare);

    const loaderSquare = document.querySelector('.loader__square-box');

    window.onload = function () {
      setTimeout(function () {
        if (!loaderSquare.classList.contains('hiden')) {
          loaderSquare.classList.add('hiden');
        }
      }, 600);
    };
  }
}
