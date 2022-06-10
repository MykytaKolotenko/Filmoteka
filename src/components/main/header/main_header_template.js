export default mainHeaderTemplate = () =>
  `<div class="main__header">
        <div class="main__header-buttons">
          <button type="button" class="main__header-logo" data-main="home">
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
          <input type="text" placeholder="Search..." data-main="input"/>
          <img src="./images/search.svg" alt="" />
        </div>
      </div>`;
