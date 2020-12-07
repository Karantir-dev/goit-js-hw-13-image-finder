import './styles.css';
import debounce from 'lodash.debounce';
import imagesCardTpl from './templates/imgCardTmpl.hbs';
import PixabayApiServise from './js/APIService';
import notification from './js/PnotifyConfig';

const refs = {
  input: document.querySelector('#search-form input'),
  gallery: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.js_btn'),
};

const pixabayApiServise = new PixabayApiServise();

refs.input.addEventListener('input', debounce(onSearchInputChange, 500));
refs.btnLoad.addEventListener('click', onLoadMore);

async function onSearchInputChange({ target }) {
  pixabayApiServise.query = target.value;
  if (pixabayApiServise.query === '') {
    refs.btnLoad.classList.add('is_hidden');
    return;
  }

  const result = await pixabayApiServise.fetchImages();

  console.log(result);

  if (result.total === 0) {
    notification('Image not found.');
    clearArticlesList();
    refs.btnLoad.classList.add('is_hidden');
    return;
  }

  clearArticlesList();
  pixabayApiServise.resetPage();
  appendImagesMarkup(result);
}

function appendImagesMarkup({ hits }) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesCardTpl(hits));
  refs.btnLoad.classList.remove('is_hidden');
}

function clearArticlesList() {
  refs.gallery.innerHTML = '';
}

function onLoadMore() {
  pixabayApiServise.fetchImages().then(appendImagesMarkup);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
