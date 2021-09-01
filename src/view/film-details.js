import dayjs from 'dayjs';
import {FILM_GENRES_MAP, MOCK_DIRECTORS_MAP, MOCK_ACTORS_MAP, MOCK_WRITERS_MAP, HUMANIZED_FILM_RELEASE_DATE_FORMAT} from '../const.js';

export const createFilmDetails = (props) => {
  const {title, originalTitle, rating, country, director, writers, actors, releaseDate, duration, genres, imgSrc, description, commentCount, contentRating, isFavorite, isWatched, isWatchlist} = props;

  const POPUP_BUTTON_ACTIVE_CLASSNAME = 'film-details__control-button--active';

  const getGenreHTML = (item) => `<span class="film-details__genre">${item}</span>`;

  const resolveGenres = (arr) => {
    let newGenresHTML = '';

    for (let i = 0; i < arr.length; i++) {
      newGenresHTML += getGenreHTML(FILM_GENRES_MAP.get(arr[i]));
    }

    return newGenresHTML;
  };

  const arrayToStringWMap = (array, map) => {
    const newArray = [];

    const reducerToNewArray = (accumulator, currentValue) => {
      newArray.push(map.get(currentValue));
    };

    array.reduce(reducerToNewArray, 0);

    return newArray.join(', ');
  };

  const getDirectorsName = (d) => {
    const newDirector = MOCK_DIRECTORS_MAP.get(d);

    return newDirector;
  };

  const directorString = getDirectorsName(director);

  const actorsString = arrayToStringWMap(actors, MOCK_ACTORS_MAP);

  const writersString = arrayToStringWMap(writers, MOCK_WRITERS_MAP);

  const resolvedGenres = resolveGenres(genres);

  const humanizedReleaseDate = dayjs(releaseDate).format(HUMANIZED_FILM_RELEASE_DATE_FORMAT);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${imgSrc}" alt="${title} - Poster">

            <p class="film-details__age">${contentRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${directorString}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writersString}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actorsString}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizedReleaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${resolvedGenres}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isWatchlist ? POPUP_BUTTON_ACTIVE_CLASSNAME : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${isWatched ? POPUP_BUTTON_ACTIVE_CLASSNAME : ''}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${isFavorite ? POPUP_BUTTON_ACTIVE_CLASSNAME : ''}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

          <ul class="film-details__comments-list"></ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};
