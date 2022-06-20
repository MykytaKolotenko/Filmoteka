import ModalAPI from './js/components/filmModal/filmModal';
import ModalFooter from './js/components/main/footerModal/footerModal';

import Loader from './js/components/loader/loader-square';
import libraryPage from './js/libraryPageClass.js';
import mainPage from './js/mainPageClass';

// new libraryPage();

let renderPage = new mainPage();

renderPage.onChangePage();
renderPage.renderFooter();

new ModalAPI();

new ModalFooter();

new Loader();
