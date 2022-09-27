import axios from 'axios';
import bootstrap from 'bootstrap';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupCard } from './markup/markup';
import { formRefs, markupGallery, loadBtRef } from './refs/refs';

const apiKey = '30088008-597ccc3296e84add455afba6c';

const searchParams = new URLSearchParams({
  key: apiKey,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});
const baseURL = `https://pixabay.com/api/?${searchParams}`;

let search;
let page = 1;

formRefs.addEventListener('submit', start);

async function start(event) {
  event.preventDefault();
  search = event.target.elements.searchQuery.value.trim();
  if (!search)
    return (
      (markupGallery.innerHTML = ''), loadBtRef.classList.add('visually-hidden')
    );
  try {
    const data = await getPhoto(search, page);
    console.log('data :', data);

    const markup = markupCard(data);
    upDate(markup);
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function getPhoto(search, page) {
  const {
    data: { hits, totalHits },
  } = await axios.get(`${baseURL}&q=${search}&page=${page}&per_page=40`);
  if (hits.length === 0)
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  totalPage(totalHits);
  return hits;
}
let totalPages = 0;
let total = 0;
function totalPage(totalHits) {
  totalPages++;
  total = Math.ceil(totalHits / 40);
  console.log('total :', total);
  console.log('totalPages :', totalPages);
  // if (condition) {

  // }
}
//////////////////////////////// Дополнительно прокрутка страницы (детей) добавить в upDate
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// console.log('cardHeight', cardHeight);

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
//////////////////////////////////////////////////////////////////////////////

function upDate(markup = '') {
  markupGallery.innerHTML = markup;
  // loadBtRef.classList.remove('visually-hidden');
}

///////////========КНОПКА========////////////////////
// loadBtRef.addEventListener('click', loadImg);

// function loadImg() {
//   page++;
//   mountData(search, page);
// }

// async function mountData(search, page) {
//   try {
//     const data = await getPhoto(search, page);
//     const markup = markupCard(data);
//     markupGallery.insertAdjacentHTML('beforeend', markup);
//   } catch (error) {
//     Notify.failure(error.message);
//   }
// }
///////////========КНОПКА========////////////////////
// window.addEventListener('scroll', throttle(scrolLoad, 1000));

window.addEventListener('scroll', throttle(scrolLoad, 500));
async function scrolLoad() {
  console.log('nmmnmbknbkn', 'nmmnmbknbkn');
  const positionDocument = document.documentElement.getBoundingClientRect();
  if (totalPages === total) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  } else if (
    positionDocument.bottom <
    document.documentElement.clientHeight + 350
  ) {
    page++;
    await mountData(search, page);
  }
}
async function mountData(search, page) {
  try {
    const data = await getPhoto(search, page);
    const markup = markupCard(data);
    markupGallery.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    Notify.failure(error.message);
  }
}
