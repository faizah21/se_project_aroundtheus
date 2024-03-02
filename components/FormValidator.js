class FormValidator {
  constructor(formSelector, config) {
    this._inputSelector = config.inputSelector;
    this._formElement = document.querySelector(formSelector);
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._formOptions = config;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  _toggleButtonState() {
    if (this._checkFormValidity()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkFormValidity() {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _showInputError(inputElement, errorMessage) {
    this._errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = errorMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputElement, errorMessage) {
    this._errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }
  // resetValidation() {
  //   this._inputElements.forEach((inputEl) => {
  //     this._hideInputError(inputEl, this._formOptions);
  //   });
  //   this._toggleButtonState(
  //     this._inputElements,
  //     this._submitButton,
  //     this._formOptions
  //   );
  // }
}

export default FormValidator;
