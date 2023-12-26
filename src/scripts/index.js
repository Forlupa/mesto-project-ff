import '../pages/index.css';
import { initialCards } from './cards.js'; 
import { addCard } from './card.js'; 
import { exitPopup, runPopup } from './modal.js'; 

const popupEditor = document.querySelector('.popup_type_edit'); //Находим попап редактирования
const popupAdder = document.querySelector('.popup_type_new-card'); //Находим попап добавления карточки

const editBtn = document.querySelector('.profile__edit-button'); //Находим кнопку редактирования
const addBtn = document.querySelector('.profile__add-button'); //Находим кнопку добавления карточки

const closeButtons = document.querySelectorAll('.popup__close'); //Находим кнопку с крестиком 

const profileName = document.querySelector('.profile__title'); // имя на странице
const profileJob = document.querySelector('.profile__description'); //профессия на странице

const nameInput = document.querySelector('.popup__input_type_name'); //поле ввода имени
const jobInput = document.querySelector('.popup__input_type_description'); //поле ввода профессии

const placeInput = document.querySelector('.popup__input_type_card-name'); //поле ввода названия места
const srcInput = document.querySelector('.popup__input_type_url'); //поле ввода ссылки на картинку


initialCards.forEach(function(elem) {
  addCard(elem.name, elem.link);
}); 

closeButtons.forEach((button) => {
  // находим ближайший к крестику попап 
  const popup = button.closest('.popup');
  const popupContainer = button.closest('.popup__content');
  
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => exitPopup(popup));

  popup.addEventListener('mousedown', function(evt) {
    if (!popupContainer.contains(evt.target)) {
      exitPopup(popup);
    }
  });  
});


//Слушатель событий для кнопки "редактировать"
editBtn.addEventListener('click', function() {
  runPopup(popupEditor)
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
});

//Слушатель событий для кнопки "добавить"
addBtn.addEventListener('click', function() {
  runPopup(popupAdder)
});


// Находим форму в DOM
const formElement = document.querySelector('.popup__form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  profileJob.textContent = jobInput.value;
  profileName.textContent  = nameInput.value;

  exitPopup(popupEditor)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

function addFormSubmit(evt) {
  evt.preventDefault();
 
  addCard(placeInput.value, srcInput.value);

  evt.target.reset()

  exitPopup(popupAdder);
}

popupAdder.addEventListener('submit', addFormSubmit);




