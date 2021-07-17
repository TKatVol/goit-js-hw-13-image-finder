export default function getRefs() {
    return {
        page: document.querySelector('body'),
        searchForm : document.querySelector('#search-form'),
        galleryContainer: document.querySelector('#gallery'),
        loadMoreBtn: document.querySelector('.load-more-btn'),
    };
}