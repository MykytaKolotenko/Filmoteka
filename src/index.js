import ModalAPI from './js/components/filmModal/ModalApi';
import FooterModal from './js/components/main/footerModal/footerModal';
import MainPage from './js/PageMainClass';

MainPage.prototype.renderLoaderSquare(true);

let renderPage = new MainPage();

renderPage.onChangePage();
renderPage.renderFooter();

new ModalAPI();

new FooterModal();
