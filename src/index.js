import './sass/main.scss';
import ImagesApiService from './js/api-service.js';
import galleryTpl from './templates/gallery-card.hbs';
import getRefs from './js/get-refs';
import { showSuccess, showInfo, showError } from './js/pnotify.js';
import * as basicLightbox from 'basiclightbox';

const refs = getRefs();

const myImages = new ImagesApiService();
showInfo();

const searchImages = event => {
    event.preventDefault();

    const mySearch = event.currentTarget.elements.query.value.trim();

    myImages.query = mySearch;

    if (myImages.query === '') {
        clearGalleryContainer();
        showOrHideBtn();
        showInfo();
        return;
    }

    myImages.resetPage();
    clearGalleryContainer();
    showOrHideBtn();
    fetchImagesCards();
}

const loadMoreImages = () => {
    fetchImagesCards();
}

const fetchImagesCards = () => {
    myImages.fetchImages()
        .then(({ hits, total, newTotal }) => {

            if (total === 0) {
                showError();
                return;
            } else {
                showOrHideBtn(newTotal);
            }

            showSuccess();
            createImagesCards(hits);
            setTimeout(scrollToBottom, 1000);
        })
}

const showOrHideBtn = number => {
    if (number > 12) {
        refs.loadMoreBtn.classList.remove('is-hidden');
        return;
    }

    refs.loadMoreBtn.classList.add('is-hidden');
}

const createImagesCards = images => {
    refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(images));
}

const clearGalleryContainer = () => {
    refs.gallery.innerHTML = '';
}

const scrollToBottom = () => {
    refs.galleryContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

const showLargeImage = event => {
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const largeImgSrc = event.target.getAttribute('data-large-img-src');
    
    const instance = basicLightbox.create(`
    <img src="${largeImgSrc}">
     `
    );
    instance.show();
}

refs.searchForm.addEventListener('submit', searchImages);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);
refs.gallery.addEventListener('click', showLargeImage);