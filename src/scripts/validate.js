const showInputError = (formElement, formInput, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(settings.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.error)
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput, settings) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(settings.inputError);
  errorElement.classList.remove(settings.error);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput, settings) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, settings);
  } else {
    hideInputError(formElement, formInput, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButton);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButton);
  }
}; 

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.item));
  const buttonElement = formElement.querySelector(settings.submit);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput, settings)
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}; 

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.form));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.item));
  const buttonElement = formElement.querySelector(settings.submit);
  buttonElement.classList.add(settings.inactiveButton);
  inputList.forEach((formInput) => {
    hideInputError(formElement, formInput, settings);
    formInput.setCustomValidity("");
  });
};

const settings = {
  form: '.popup__form',
  item: '.popup__input',
  submit: '.popup__button',
  inactiveButton: 'popup__button_inactive',
  inputError: 'popup__input_type_error',
  error: 'popup__input-error_active'
}





export { enableValidation, clearValidation, settings }; 