import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;

    this.setEventListeners();
  }
  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
  setButtonText(buttonText) {
    this._form.querySelector(".modal__button").textContent = buttonText;
  }
}
