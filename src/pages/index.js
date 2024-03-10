// import Card from "../../components/Card.js";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Constants, { config } from "../utils.js/constants";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import "../pages/index.css";
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
//imports
const constants = new Constants();

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

function renderCard(cardData) {
  const { name, link } = cardData;
  const card = new Card(cardData, "#card-template", () =>
    handleImageClick(name, link)
  );
  return card.generateCard();
}
const cardsWrap = new Section(
  {
    items: constants.initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
cardsWrap.renderItems();

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

function handleImageClick(imageName, imageLink) {
  imagePopup.open({ name: imageName, link: imageLink });
}

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

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

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
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

const profileFormValidate = new FormValidator(profileEditForm, config);

const cardFormValidate = new FormValidator(addCardFormElement, config);

// profileFormValidate.resetValidation();

cardFormValidate.enableValidation();
profileFormValidate.enableValidation();

//NEw Code for opening popup
const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    handleProfileEditSubmit(data);
  },
});
profileEditPopup.setEventListeners();

//open modal for profile
profileEditBtn.addEventListener("click", () => {
  profileEditPopup.open();
  // profileFormValidate.resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

const cardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    handleAddCardFormSubmit(data);
  },
});

addNewCardBtn.addEventListener("click", () => {
  cardPopup.open();
});

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardTitleUrl.value;
  const cardElement = renderCard({ name, link });
  cardsWrap.addItem(cardElement);
  cardPopup.close();
  e.target.reset();
  cardFormValidate.toggleButtonState();
}

//UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  const newName = profileTitleInput.value;
  const newJob = profileDescriptionInput.value;
  userInfo.setUserInfo({ name: newName, job: newJob });
  profileEditPopup.close();
}

profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  profileEditPopup.open();
});

profileEditForm.addEventListener("submit", (evt) => {
  handleProfileEditSubmit(evt);
});
