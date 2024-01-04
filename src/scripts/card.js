
import { template } from './index.js'; 


function createCard( name, link, onDump, onLike, onImg ) {
  const templateClone = template.content.cloneNode(true)//клонировали типплейт
  const card = templateClone.querySelector('.card').cloneNode(true);//клонировали содержимое
  const cardTitle = card.querySelector(".card__title");//нашли название
  const cardImage = card.querySelector('.card__image');//нашли картинку
  const cardDump = card.querySelector('.card__delete-button');//нашли кнопку с мусоркой
  const cardLike = card.querySelector('.card__like-button');//нашли кнопку с сердечком

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name; //тут подставили значения для атрибутов картинки и для названия

  cardDump.addEventListener('click', () => onDump(cardDump)); 

  cardImage.addEventListener('click', () => onImg(name, link))

  cardLike.addEventListener('click', () => onLike(cardLike));

  return card; //Вернули готовую карточку
}



//Функция лайка карточки
function likeCard(button) {
  button.classList.toggle('card__like-button_is-active')
}

function deleteCard(dump) {
  const cardItem = dump.closest('.card');
  cardItem.remove();
}

export { createCard, likeCard, deleteCard };