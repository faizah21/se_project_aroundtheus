export default class Card {
  constructor(
    { _id, name, link, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    handleUnlikeClick
  ) {
    this.id = _id;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleUnlikeClick = handleUnlikeClick;
    this.isLiked = isLiked;
  }

  _setEventListeners() {
    //like button
    this._likeButton.addEventListener("click", () => {
      if (this.isLiked) {
        this._handleUnlikeClick(this);
      } else {
        this._handleLikeClick(this);
      }
    });
    //delete button
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    }); // Open confirmation popup

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  addLike = () => {
    this.isLiked = true;
    this._likeButton.classList.add("card__like-button_active");
  };
  removeLike = () => {
    this.isLiked = false;
    this._likeButton.classList.remove("card__like-button_active");
  };
  _setLikeButtonState() {
    this.isLiked ? this.addLike() : this.removeLike();
  }
  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  generateCard() {
    //also known as getView
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setLikeButtonState();
    this._setEventListeners();
    return this._cardElement;
    // cardImageEl.alt = cardData.name;
  }
}
