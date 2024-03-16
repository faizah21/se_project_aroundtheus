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
const profileTitleInput = document.querySelector(".profile__title__input");
const profileDescriptionInput = document.querySelector(
  ".profile__description__input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

//card selectors
const addNewCardBtn = document.querySelector(".profile__add-button");
const addCardFormElement = document.querySelector("#add-card-form");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardTitleUrl = addCardFormElement.querySelector(".modal__input_type_url");
const constants = new Constants();


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


const profileFormValidate = new FormValidator(profileEditForm, config);

const cardFormValidate = new FormValidator(addCardFormElement, config);

cardFormValidate.enableValidation();
profileFormValidate.enableValidation();

const cardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    handleAddCardFormSubmit(data);
  },
});
cardPopup.setEventListeners();


function handleAddCardFormSubmit(e) {
  const name = cardTitleInput.value;
  const link = cardTitleUrl.value;
  const cardElement = renderCard({ name, link });
  cardsWrap.addItem(cardElement);
  cardPopup.close();
  cardPopup.form.reset();
  cardFormValidate.toggleButtonState();
}
addNewCardBtn.addEventListener("click", () => {
  cardPopup.open();
});

//UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
profileEditPopup.setEventListeners();

function handleProfileEditSubmit(formData) {
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
