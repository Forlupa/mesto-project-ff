import { openPic } from './modal.js'; 

const sectionCards = document.querySelector('.places__list')

function createCard(name, link) {
  const template = document.querySelector('#card-template')//нашли тимплейт
  const cards = template.content.cloneNode(true)//клонировали его
  const card = cards.querySelector('.card').cloneNode(true);//клонировали содержимое
  const cardTitle = card.querySelector(".card__title");//нашли название
  const cardImage = card.querySelector('.card__image');//нашли картинку
  const cardDump = card.querySelector('.card__delete-button');//нашли кнопку с мусоркой

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name; //тут подставили значения для атрибутов картинки и для названия

  cardDump.addEventListener('click', function () {
    const cardItem = cardDump.closest('.card');
    cardItem.remove();
  }); 

  cardImage.addEventListener('click', () => openPic(name, link))

  sectionCards.addEventListener('click', likeCard);

  return card; //Вернули готовую карточку
}

function addCard(name, link) {
  const card = createCard(name, link); //Берем карточку
  sectionCards.prepend(card); //и вставляем ее на место
}

//Функция лайка карточки
function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

export { addCard };