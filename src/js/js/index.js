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

async function start(event) {
  event.preventDefault();
  const search = event.target.elements.searchQuery.value.trim();
  if (!search) return;
  try {
    const data = await getPhoto(search);
    console.log('data :', data);
    const markup = markupCard(data);
    upDate(markup);
  } catch (error) {
    Notify.failure(error.message);
  }
}

let page = 1;

async function getPhoto(search) {
  const {
    data: { hits },
  } = await axios.get(`${baseURL}&q=${search}&page=${page}&per_page=40`);
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
  getPhoto((page += 1));
  markupGallery.insertAdjacentElement('beforeend', data);
}
