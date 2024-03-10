import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => this._handleSubmit(evt));
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = this._getInputValues();
    this._handleFormSubmit(formData);
    this.close();
  };

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll(".modal__input"));
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
}
