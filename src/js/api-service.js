const API_KEY = '22469599-b799b36696d1999c47d80d468';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const response = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
        const { hits, total } = await response.json();
        
        const newTotal = total - (this.page * 12) + 12;
        this.addPage();
           
        return { hits, total, newTotal};
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    addPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}

