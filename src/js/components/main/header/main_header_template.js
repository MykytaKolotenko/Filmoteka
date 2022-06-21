import picture from '../../../../images/search.svg';

export default function mainHeaderTemplate(genres) {
  return `<div class="main__header"><div class="main__header-buttons">
          <button type="button" class="main__header-logo" data-main="homeLogo">
            Filmoteka
          </button>
          <div class="main__header-nav">
            <button
              type="button"
              class="main__header-btn active__page-btn"
              data-main="home"
            >
              home
            </button>
            <button type="button" class="main__header-btn" data-main="library">
              my library
            </button>
          </div>
        </div>
        <div class="main__header-input">
          <input id="searchField" type="text" placeholder="Search..." data-main="input"/>
          <img id="searchIcon" src="${picture}" alt="" />
        </div>
        <div class="toolbar">
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
          </div>
        <div class="main__header-select">
          <button id="ganres_select-close" class="close-btn"></button>
          <select id="ganres_select">
            <option value="0">Search by genres</option>
            ${
              genres.length &&
              genres.map(
                ({ id, name }) => `<option value="${id}">${name}</option>`
              )
            }
          </select>
        </div>`;
}
