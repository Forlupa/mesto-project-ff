function exitPopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape); 
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened') 
    exitPopup(openedPopup);
  }
}

//Это функция, открывающая любой попап
function runPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape); 
}

//Открытие попапа с картинкой 
function openPic(name, link) {
  
  const popupPic = document.querySelector('.popup_type_image'); //попап с картинкой
  const popupImg = popupPic.querySelector('.popup__image');
  const popupImgSignature = popupPic.querySelector('.popup__caption');

  runPopup(popupPic);

  popupImg.src = link;
  popupImg.alt = name;
  popupImgSignature.textContent = name;
}

export { openPic, exitPopup, runPopup };