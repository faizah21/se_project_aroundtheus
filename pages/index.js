import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//profile selectors:
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".profile__title__input");
const profileDescriptionInput = document.querySelector(
  ".profile__description__input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
//card selectors
const addNewCardBtn = document.querySelector(".profile__add-button");
const addCardFormElement = document.querySelector("#add-card-form");
const cardsWrapper = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);

const cardTitleUrl = addCardFormElement.querySelector(".modal__input_type_url");

//modal selectors
const closeProfileModal = document.querySelector("#modal-close");
const imageModal = document.querySelector("#image-modal");
const modalImageElement = imageModal.querySelector(".modal__image");
const modalDescription = imageModal.querySelector(".modal__description");
const imageOpenedModal = document.querySelector("#add-card-modal");
const closeImageModal = document.querySelector("#close-image");
const addCardModalCloseButton = document.querySelector(
  "#profile-card-modal-close"
);
const addCardModal = document.querySelector("#add-card-modal");
const modal = document.querySelectorAll(".modal__container");


//rendereing the card data
function renderCard(cardData, wrapper) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick
  ).generateCard();

  wrapper.prepend(card);
}

initialCards.forEach((cardData) => renderCard(cardData, cardsWrapper));

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  //delete card
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () => {
    const modalImageElement = imageModal.querySelector(".modal__image");
    const modalDescription = imageModal.querySelector(".modal__description");
    modalDescription.textContent = cardData.name;
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    openModal(imageModal);
  });

  return cardElement;
}

function handleImageClick(imageData) {
  openModal(imageModal);
  modalDescription.textContent = this._name;
  modalImageElement.src = this._link;
  modalImageElement.alt = this._name;
}

//functions- modals:
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

//handlers for submitting form
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  // profileFormValidate.resetValidation();
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardTitleUrl.value;
  renderCard({ name, link }, cardsWrapper);
  e.target.reset();
  closeModal(addCardModal);
}

//form listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//open modal for profile
profileEditBtn.addEventListener("click", () => {
  openModal(profileEditModal);
  // profileFormValidate.resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

//modal open and close
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    //search for opened modal
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModalOnClick(evt, element) {
  if (
    evt.target.classList.contains("modal_opened") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(element);
  }
}
profileEditModal.addEventListener("click", (evt) => {
  closeModalOnClick(evt, profileEditModal);
});

addCardModal.addEventListener("click", (evt) => {
  closeModalOnClick(evt, addCardModal);
});

imageModal.addEventListener("click", (evt) => {
  closeModalOnClick(evt, imageModal);
});

// fix duplicated code:
function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
}
profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);

addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);

closeImageModal.addEventListener("mousedown", closeModalOnRemoteClick);

closeImageModal.addEventListener("click", () => {
  closeModal(imageModal);
});

//add new card button
addNewCardBtn.addEventListener("click", () => openModal(addCardModal));

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileFormValidate = new FormValidator("#profile-form", config);
const cardFormValidate = new FormValidator("#add-card-form", config);

profileFormValidate.enableValidation();
// profileFormValidate.resetValidation();
cardFormValidate.enableValidation();
