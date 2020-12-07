import notification from './PnotifyConfig';
const API_KEY = '19409083-c44dedced2b14f118a69bc1b1';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
      const resultFetch = await fetch(url).then(res => res.json());

      this.incrementPage();

      return resultFetch;
    } catch (error) {
      notification();
      console.log(error);
      return error;
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
