import ModalAPI from './js/components/filmModal/ModalApi';
import ModalFooter from './js/components/main/footerModal/FooterModal';
import mainPage from './js/mainPageClass';

mainPage.prototype.renderLoaderSquare(true);

let renderPage = new mainPage();

renderPage.onChangePage();
renderPage.renderFooter();

new ModalAPI();
new ModalFooter();
