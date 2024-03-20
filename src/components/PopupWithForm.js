import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector(".modal__form");
    this._inputList = this.form.querySelectorAll(".modal__input");
  }
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(userInfo) {
    //userInfo.name, userInfo.description
    const userArray = Object.values(userInfo);
    for (let i = 0; i < userArray.length; i++) {
      this._inputList[i].value = userArray[i];
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setButtonText(buttonText) {
    this.form.querySelector(".modal__button").textContent = buttonText;
  }
}
