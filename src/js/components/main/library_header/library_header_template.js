export default function libraryHeaderTemplate() {
  return `<div class="library__header">
        <div class="library__header-buttons">
          <button type="button" class="library__header-logo" data-main="home">
            Filmoteka
          </button>
          <div class="library__header-nav">
            <button
              type="button"
              class="library__header-btn"
              data-main="home"
            >
              home
            </button>
            <button type="button" class="library__header-btn active__page-btn" data-main="library">
              my library
            </button>
          </div>
        </div>
        <div class="library__header-btns">
          <button type="button" class="library__header-button active" data-main="watched">
           Watched
          </button>
          <button type="button" class="library__header-button" data-main="queue">
            Queue
          </button>
        </div>
        <!-- Свитчер темы -->
      <div class="theme-switch">
        <div class="theme-switch__control">
          <input
            class="theme-switch__toggle"
            type="checkbox"
            name="theme"
            id="theme-switch-toggle"
            aria-label="Переключить с тёмной темы на светлую"/>
          <label aria-hidden="true" class="theme-switch__track" for="theme-switch-toggle"></label>
          <div aria-hidden="true" class="theme-switch__marker"></div>
           </div>
      </div>`;
}
