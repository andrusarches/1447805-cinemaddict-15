import { createFilmCard } from './view/film-card';
import { createFilmDetails } from './view/film-details';
import { createFilmsListExtra } from './view/films-list-extra';
import { createFilmsSection } from './view/films-section';
import { createFilmsList } from './view/films-list';
import { createFiltersList } from './view/filters-list';
import { createHeaderProfile } from './view/header-profile';
import { createMainNavigation } from './view/main-navigation';
import { createShowMoreButton } from './view/show-more-button';
import { FILM_CARD_MOCK_DATA } from './mock/filmdata';
import { FILMS_INITIALLY_DISPLAYED_NUMBER, FILM_DISPLAY_COUNT_INCREASE_PER_STEP } from './const';

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const EXTRA_LISTS = [
  {
    'title': 'Top rated',
    'id': 'top-rated-list',
  },
  {
    'title': 'Most commented',
    'id': 'most-commented-list',
  },
];
const EXTRA_LIST_CARD_NUMBER = 2;

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

render(headerElement, createHeaderProfile(), 'beforeend');
render(mainElement, createMainNavigation(), 'afterbegin');

const mainNavigation = mainElement.querySelector('.main-navigation');

render(mainNavigation, createFiltersList(), 'afterend');
render(mainElement, createFilmsSection(), 'beforeend');

const filmsSection = mainElement.querySelector('.films');

render(filmsSection, createFilmsList(), 'afterbegin');

const filmsList = filmsSection.querySelector('.films-list');

const filmsListContainer = filmsList.querySelector('.films-list__container');

const displayCountIncrease = FILM_DISPLAY_COUNT_INCREASE_PER_STEP;
let renderedFilmCardCount = FILMS_INITIALLY_DISPLAYED_NUMBER;

const showMoreFilmCards = () => {
  let newDisplayCount = renderedFilmCardCount + displayCountIncrease;

  if (FILM_CARD_MOCK_DATA.length <= newDisplayCount) {
    newDisplayCount = renderedFilmCardCount + (FILM_CARD_MOCK_DATA.length - renderedFilmCardCount);

    const showMoreButton = filmsList.querySelector('.films-list__show-more');
    showMoreButton.remove();
  }

  for (let i = renderedFilmCardCount; i < newDisplayCount; i++) {
    render(filmsListContainer, createFilmCard(FILM_CARD_MOCK_DATA[i]), 'beforeend');
  }
  renderedFilmCardCount = newDisplayCount;
};

const onShowMoreButton = (evt) => {
  evt.preventDefault();
  showMoreFilmCards();
};

let cardsNumberToShow;

if (FILM_CARD_MOCK_DATA.length < FILMS_INITIALLY_DISPLAYED_NUMBER) {
  cardsNumberToShow = FILM_CARD_MOCK_DATA.length;
} else {
  cardsNumberToShow = FILMS_INITIALLY_DISPLAYED_NUMBER;

  render(filmsList, createShowMoreButton(), 'beforeend');

  const showMoreButton = filmsList.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', onShowMoreButton);
}

for (let i = 0; i < cardsNumberToShow; i++) {
  render(filmsListContainer, createFilmCard(FILM_CARD_MOCK_DATA[i]), 'beforeend');
}

for (let i = 0; i < EXTRA_LISTS.length; i++) {
  render(filmsSection, createFilmsListExtra(EXTRA_LISTS[i]), 'beforeend');
}

const extraFilmsLists = filmsSection.querySelectorAll('.films-list--extra');

for (let i = 0; i < extraFilmsLists.length; i++) {
  for (let j = 0; j < EXTRA_LIST_CARD_NUMBER; j++) {
    render(extraFilmsLists[i].querySelector('.films-list__container'), createFilmCard(FILM_CARD_MOCK_DATA[j]), 'beforeend');
  }
}

render(footerElement, createFilmDetails(FILM_CARD_MOCK_DATA[0]), 'afterend');
