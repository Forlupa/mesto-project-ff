import { cardTemplate } from './index.js'; 
import { removeCard, putLike, deleteLike } from './api.js'; 



function createCard( item, userId, onDump, onLike, onImg ) {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);//клонировали типплейт
  const cardTitle = card.querySelector(".card__title");//нашли название
  const cardImage = card.querySelector('.card__image');//нашли картинку
  const cardDump = card.querySelector('.card__delete-button');//нашли кнопку с мусоркой
  const cardLike = card.querySelector('.card__like-button');//нашли кнопку с сердечком
  const cardLikeCounter = card.querySelector('.card__like-counter');//нашли кнопку с сердечком

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name; //тут подставили значения для атрибутов картинки и для названия
 

  if (item.owner._id === userId) {
    cardDump.addEventListener('click', () => onDump(cardDump, item._id)); 
  } else {
    cardDump.classList.remove('card__delete-button_visible');
  }
  
  
  cardImage.addEventListener('click', () => onImg(item))


  cardLikeCounter.textContent = item.likes.length;
  const liked = item.likes.some((likes) => likes._id === userId);
  if (liked) {
    cardLike.classList.add("card__like-button_is-active");
  }
  cardLike.addEventListener('click', () => onLike(cardLike, item._id, cardLikeCounter, item));

  return card; //Вернули готовую карточку
}



//Функция лайка карточки
function likeCard(button, cardId, likeCounter ) {
  if (button.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
    .then((card) => {
      likeCounter.textContent = card.likes.length;
      button.classList.remove('card__like-button_is-active');
    })
    .catch((err) => {
      console.error(err);
    }) 
  } else {
    putLike(cardId)
    .then((card) => {
      likeCounter.textContent = card.likes.length;
      button.classList.add('card__like-button_is-active');
    })
    .catch((err) => {
      console.error(err);
    }) 
  }
}

function deleteCard(dump, cardId) {
  const cardItem = dump.closest('.card');
  removeCard(cardId)
    .then(() => {
      cardItem.remove();
    })
  .catch((err) => {
    console.error(err);
  }) 
}


export { createCard, likeCard, deleteCard };