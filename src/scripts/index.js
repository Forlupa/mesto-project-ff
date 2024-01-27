import '../pages/index.css';
import { createCard, likeCard, deleteCard } from './card.js'; 
import { closePopup, runPopup, closeByOverlay } from './modal.js'; 
import { enableValidation, clearValidation, settings } from './validate.js'; 
import { getInitialInfo, updateProfile, uploadCard, uploadAvatar } from './api.js'; 
import { data } from 'autoprefixer';

const popupEditor = document.querySelector('.popup_type_edit'); //Находим попап редактирования
const popupAdder = document.querySelector('.popup_type_new-card'); //Находим попап добавления карточки
const popupAvatar = document.querySelector('.popup_type_avatar');

const editBtn = document.querySelector('.profile__edit-button'); //Находим кнопку редактирования
const addBtn = document.querySelector('.profile__add-button'); //Находим кнопку добавления карточки
const avatarBtn = document.querySelector('.profile__avatar-container'); 

const closeButtons = document.querySelectorAll('.popup__close'); //Находим кнопку с крестиком 

const profileName = document.querySelector('.profile__title'); // имя на странице
const profileJob = document.querySelector('.profile__description'); //профессия на странице
const profileAvatar = document.querySelector('.profile__avatar'); 


const nameInput = document.querySelector('.popup__input_type_name'); //поле ввода имени
const jobInput = document.querySelector('.popup__input_type_description'); //поле ввода профессии

const avatarInput = document.querySelector('.popup__input_type_url'); 

const popupPic = document.querySelector('.popup_type_image'); //попап с картинкой
const popupImg = popupPic.querySelector('.popup__image');
const popupImgSignature = popupPic.querySelector('.popup__caption');

const sectionCards = document.querySelector('.places__list');

let userId;

function btnLoading(loading = "start", btn) {
  if (loading === "start") {
    btn.textContent = 'Сохранение...'
  } else {
    btn.textContent = 'Сохранить'
  }
}


//Открытие попапа с картинкой 
function openPic(item) {

  runPopup(popupPic);

  popupImg.src = item.link;
  popupImg.alt = item.name;
  popupImgSignature.textContent = item.name;
}

function addCard(item, userId, place ="end",) {
  const card = createCard(item, userId, deleteCard, likeCard, openPic ); //Берем карточку

  if (place === "end") {
    sectionCards.append(card);
  } else {
    sectionCards.prepend(card);
  }
}

function renderCards(initialCards, userId) {
  initialCards.forEach(function(elem) {
    addCard(elem, userId);
  }); 
}

closeButtons.forEach((button) => {
  // находим ближайший к крестику попап 
  const popup = button.closest('.popup');
  
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('mousedown', closeByOverlay);  
});


//Заполнение профиля данными с сервера
function fillProfile(user) {
  profileName.textContent = user.name;
  profileJob.textContent = user.about;
};


//Слушатель событий для кнопки "редактировать"
editBtn.addEventListener('click', function() {
  clearValidation(popupEditor, settings);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
  runPopup(popupEditor);
});

//Слушатель событий для кнопки "добавить"
addBtn.addEventListener('click', function() {
  runPopup(popupAdder)
});

avatarBtn.addEventListener('click', function() {
  runPopup(popupAvatar)
});


// Находим форму в DOM
const formEdit = document.forms["edit-profile"];

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
  evt.preventDefault(); 
  btnLoading("start", evt.submitter);

  updateProfile({
    name: formEdit.name.value,
    about: formEdit.description.value,
  })
    .then((updatedProfile) => {
      fillProfile(updatedProfile);
      closePopup(popupEditor);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btnLoading(false, evt.submitter);
    });

}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', handleEditFormSubmit);



const formAdder = document.forms["new-place"];

function handleAddFormSubmit(evt) {
  evt.preventDefault(); 
  btnLoading("start", evt.submitter);
  

  uploadCard({
    name: formAdder.elements["place-name"].value,
    link: formAdder.link.value,
  })
    .then((uploadedCard) => {
      addCard(uploadedCard, userId, "start",);
      closePopup(popupAdder);
      clearValidation(evt.target, settings)
      evt.target.reset()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btnLoading(false, evt.submitter);
    });

}

popupAdder.addEventListener('submit', handleAddFormSubmit);


function uploadNewAvatar(user) {
  profileAvatar.src = user.avatar;
};



const formAvatar = document.forms["new-avatar"];

function handleAvatarFormSubmit(evt) {
  evt.preventDefault(); 
  btnLoading("start", evt.submitter);

  uploadAvatar({
    avatar: formAvatar.link.value,
  })
    .then((uploadedAvatar) => {
      uploadNewAvatar(uploadedAvatar);
      closePopup(popupAvatar);
      clearValidation(evt.target, settings)
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btnLoading(false, evt.submitter);
    });

}

formAvatar.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(settings); 



getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    const initialCards = result[1];
    userId = userInfo._id;
    fillProfile(userInfo);
    renderCards(initialCards, userId);
    uploadNewAvatar(userInfo)
  })
  .catch((err) => {
    console.log(err);
  });

