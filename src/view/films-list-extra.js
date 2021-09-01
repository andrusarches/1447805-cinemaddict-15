export const createFilmsListExtra = (props) => {
  const {title, id} = props;

  return `<section id="${id}" class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container">
    </div>
  </section>`;
};
