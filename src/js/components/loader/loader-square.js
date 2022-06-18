export default class Loader {
  constructor() {
    this.renderLoaderSquare();

    // this.renderLoader();
  }
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
    console.log(loaderSquare);

    window.onload = function () {
      setTimeout(function () {
        if (!loaderSquare.classList.contains('hiden')) {
          loaderSquare.classList.add('hiden');
        }
      }, 600);
    };

    // =================== Loader ============================
    //
    // renderLoader() {
    //   const loaderTemplate = `<div class="loader-box"><span class="loader"></span></div>`;
    //   const bodyBox = document.querySelector('body');
    //   bodyBox.insertAdjacentHTML('afterbegin', loaderTemplate);

    //   const loader = document.querySelector('.loader-box');
    //   console.log(loader);
    //   window.onload = function () {
    //     setTimeout(function () {
    //       if (!loader.classList.contains('hiden')) {
    //         loader.classList.add('hiden');
    //       }
    //     }, 600);
    //   };
    // }
  }
}
