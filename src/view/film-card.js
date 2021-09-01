import dayjs from 'dayjs';
import {FILM_GENRES_MAP} from '../const';
import {MAX_DESCRIPTION_LENGTH} from '../const';

export const createFilmCard = (props) => {
  const {title, rating, releaseDate, duration, genres, imgSrc, description, commentCount, isFavorite, isWatched, isWatchlist} = props;

  const resolvedGenre = FILM_GENRES_MAP.get(genres[0]);

  const releaseYear = dayjs(releaseDate).format('YYYY');

  const BUTTON_ACTIVE_CLASSNAME = 'film-card__controls-item--active';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${resolvedGenre}</span>
    </p>
    <img src="${imgSrc}" alt="${title} - Poster" class="film-card__poster">
    <p class="film-card__description">${description.length > MAX_DESCRIPTION_LENGTH ? `${description.slice(0, (MAX_DESCRIPTION_LENGTH - 1))}...` : description}</p>
    <a class="film-card__comments">${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist ? BUTTON_ACTIVE_CLASSNAME : ''}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? BUTTON_ACTIVE_CLASSNAME : ''}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? BUTTON_ACTIVE_CLASSNAME : ''}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
