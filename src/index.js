import ModalAPI from './js/components/filmModal/filmModal';
import ModalFooter from './js/components/main/footerModal/footerModal';

import Loader from './js/components/loader/loader-square';
import libraryPage from './js/libraryPageClass.js';
import mainPage from './js/mainPageClass';
import Switcher from './js/components/main/header/switcher';

// new libraryPage();

let renderPage = new mainPage();

renderPage.onChangePage();
renderPage.renderFooter();

new ModalAPI();

new ModalFooter();

new Loader();

const switcher = new Switcher()
switcher.changeTheme();

