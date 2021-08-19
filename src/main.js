import { createFilmCard } from './view/film-card';
import { createFilmDetails } from './view/film-details';
import { createFilmsListExtra } from './view/films-list-extra';
import { createFilmsSection } from './view/films-section';
import { createFilmsList } from './view/films-list';
import { createFiltersList } from './view/filters-list';
import { createHeaderProfile } from './view/header-profile';
import { createMainNavigation } from './view/main-navigation';
import { createShowMoreButton } from './view/show-more-button';

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const EXTRA_LISTS = 2;
const EXTRA_LIST_CARD_NUMBER = 2;
const CARD_NUMBER = 5;

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

render(filmsList, createShowMoreButton(), 'beforeend');

const filmsListContainer = filmsList.querySelector('.films-list__container');

for (let i = 0; i < CARD_NUMBER; i++) {
  render(filmsListContainer, createFilmCard(), 'beforeend');
}

for (let i = 0; i < EXTRA_LISTS; i++) {
  render(filmsSection, createFilmsListExtra(), 'beforeend');
}

const extraFilmsLists = filmsSection.querySelectorAll('.films-list--extra');

for (let i = 0; i < extraFilmsLists.length; i++) {
  for (let j = 0; j < EXTRA_LIST_CARD_NUMBER; j++) {
    render(extraFilmsLists[i].querySelector('.films-list__container'), createFilmCard(), 'beforeend');
  }
}

render(footerElement, createFilmDetails(), 'afterend');
