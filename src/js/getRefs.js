export default function getRefs() {
    return {
        page: document.querySelector('body'),
        searchForm : document.querySelector('#search-form'),
        gallery: document.querySelector('.gallery'),
        galleryContainer: document.querySelector('.gallery-container'),
        loadMoreBtn: document.querySelector('.load-more-btn'),
    };
}