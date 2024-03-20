export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".modal__close");
    
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close = () => {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
