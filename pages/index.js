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

//rendereing the card data
function renderCard(cardData, wrapper) {
  const { name, link } = cardData;
  const card = new Card(cardData, "#card-template", () =>
    handleImageClick(name, link)
  ).generateCard();

  wrapper.prepend(card);
}

initialCards.forEach((cardData) => renderCard(cardData, cardsWrapper));

function handleImageClick(imageName, imageLink) {
  openModal(imageModal);
  modalDescription.textContent = imageName;
  modalImageElement.src = imageLink;
  modalImageElement.alt = imageName;
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
  closeModal(addCardModal);
  e.target.reset();
  cardFormValidate.toggleButtonState();
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

//add new card button
addNewCardBtn.addEventListener("click", () => openModal(addCardModal));

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const profileFormValidate = new FormValidator(profileEditForm, config);

const cardFormValidate = new FormValidator(addCardFormElement, config);

// profileFormValidate.resetValidation();

cardFormValidate.enableValidation();
profileFormValidate.enableValidation();
