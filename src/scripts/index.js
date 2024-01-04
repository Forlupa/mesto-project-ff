import '../pages/index.css';
import { initialCards } from './cards.js'; 
import { createCard, likeCard, deleteCard } from './card.js'; 
import { closePopup, runPopup, closeByOverlay } from './modal.js'; 

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

const template = document.querySelector('#card-template')//тимплейт

const popupPic = document.querySelector('.popup_type_image'); //попап с картинкой
const popupImg = popupPic.querySelector('.popup__image');
const popupImgSignature = popupPic.querySelector('.popup__caption');


const sectionCards = document.querySelector('.places__list')

//Открытие попапа с картинкой 
function openPic(name, link) {

  runPopup(popupPic);

  popupImg.src = link;
  popupImg.alt = name;
  popupImgSignature.textContent = name;
}

function addCard(name, link) {
  const card = createCard(name, link, deleteCard, likeCard, openPic ); //Берем карточку
  sectionCards.prepend(card); //и вставляем ее на место
}

initialCards.forEach(function(elem) {
  addCard(elem.name, elem.link);
}); 

closeButtons.forEach((button) => {
  // находим ближайший к крестику попап 
  const popup = button.closest('.popup');
  
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('mousedown', closeByOverlay);  
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
const formEdit = document.forms["edit-profile"];

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
  evt.preventDefault(); 

  profileJob.textContent = jobInput.value;
  profileName.textContent  = nameInput.value;

  closePopup(popupEditor)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', handleEditFormSubmit);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
 
  addCard(placeInput.value, srcInput.value);

  evt.target.reset()

  closePopup(popupAdder);
}

popupAdder.addEventListener('submit', handleAddFormSubmit);



export { template };
