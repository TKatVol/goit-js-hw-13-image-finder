import './css/common.css';
import ImagesApiService from './js/apiService.js';
import galleryTpl from './templates/galleryCard.hbs';
import getRefs from './js/getRefs';
import { showSuccess, showInfo, showError } from './js/pnotify.js';

const refs = getRefs();

const myImages = new ImagesApiService();
showInfo();

const searchImages = event => {
    event.preventDefault();
    
    const mySearch = event.currentTarget.elements.query.value;
    
    myImages.query = mySearch.trim();

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
        .then(({ hits, total }) => {

            if (hits.length > 0 && hits.length < 12) {
                showOrHideBtn(hits.length);
            } else if (total === 0) {
                showError();
                return;                   
            } else {
                showOrHideBtn(total);
            }
             
            showSuccess();
            createImagesCards(hits)
            setTimeout(scrollToBottom, 2000);
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

refs.searchForm.addEventListener('submit', searchImages);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);