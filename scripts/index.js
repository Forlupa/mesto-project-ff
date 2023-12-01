const sectionCards = document.querySelector('.places__list')

function createCard(elem) {
  const template = document.querySelector('#card-template')//нашли тимплейт
  const cards = template.content.cloneNode(true)//клонировали его
  const card = cards.querySelector('.card').cloneNode(true);//клонировали содержимое
  const cardTitle = card.querySelector(".card__title");//нашли название
  const cardImage = card.querySelector('.card__image');//нашли картинку
  const cardDump = card.querySelector('.card__delete-button');//нашли кнопку с мусоркой

  cardTitle.textContent = elem.name;
  cardImage.src = elem.link;
  cardImage.alt = elem.name; //тут подставили значения для атрибутов картинки и для названия

  cardDump.addEventListener('click', function () {
    const cardItem = cardDump.closest('.card');
    cardItem.remove();
  }); 

  return card; //Вернули готовую карточку
}

function addCard(elem) {
  const card = createCard(elem); //Берем карточку
  sectionCards.append(card); //и вставляем ее на место
}

initialCards.forEach((elem) => { 
  addCard(elem); //Создаем карточку из каждого элемента массива
});