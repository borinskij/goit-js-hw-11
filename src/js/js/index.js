import axios from 'axios';
import bootstrap from 'bootstrap';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupInput, markupCard } from './markup/markup';
import { formRefs, markupGallery, loadBtRef } from './refs/refs';

const apiKey = '30088008-597ccc3296e84add455afba6c';

const searchParams = new URLSearchParams({
  key: apiKey,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});

const baseURL = `https://pixabay.com/api/?${searchParams}`;

formRefs.addEventListener('submit', start);
let search;
let page = 1;

async function start(event) {
  event.preventDefault();
  search = event.target.elements.searchQuery.value.trim();
  if (!search)
    return (
      (markupGallery.innerHTML = ''), loadBtRef.classList.add('visually-hidden')
    );
  try {
    const data = await getPhoto(search, page);
    const markup = markupCard(data);
    upDate(markup);
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function getPhoto(search, page) {
  const {
    data: { hits },
  } = await axios.get(`${baseURL}&q=${search}&page=${page}&per_page=40`);
  console.log('hits', hits);
  if (hits.length === 0)
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  return hits;
}

function upDate(markup = '') {
  markupGallery.innerHTML = markup;
  loadBtRef.classList.remove('visually-hidden');
}

loadBtRef.addEventListener('click', loadImg);

function loadImg() {
  page++;
  mountData(search, page);
  console.log('page1', page);
}
async function mountData(search, page) {
  console.log('page2', page);

  try {
    const data = await getPhoto(search, page);
    const markup = markupCard(data);
    markupGallery.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    Notify.failure(error.message);
  }
}
