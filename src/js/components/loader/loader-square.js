export default class Loader {
  constructor(container) {
    this.containerBox = document.querySelector(container);
    this.template = `<div class="loader__square" style="--f: 60px">
      <div class="loader__square-item"></div>
      <div class="loader__square-item"></div>
      <div class="loader__square-item"></div>
    </div>`;

    this.containerBox.insertAdjacentHTML('beforeend', this.template);
  }
}
