import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Constants, { config } from "../utils.js/constants";
import Api from "../components/Api.js";
import Popup from "../components/Popup";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//profile selectors:
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector(".profile__title__input");
const profileDescriptionInput = document.querySelector(
  ".profile__description__input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const avatarButton = document.querySelector(".profile_image_edit_button");
//card selectors
const addNewCardBtn = document.querySelector(".profile__add-button");
const addCardFormElement = document.querySelector("#add-card-form");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const modalButton = document.querySelector("#delete-button");
const cardTitleUrl = addCardFormElement.querySelector(".modal__input_type_url");

const updateAvatarForm = document.querySelector("#change-picture-form");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a3bf07df-abe1-4d92-b90d-a2e03911adc5",
    "Content-Type": "application/json",
  },
});

function renderCard(cardData) {
  const { name, link } = cardData;
  const card = new Card(
    cardData,
    "#card-template",
    () => handleImageClick(name, link),
    handleDeleteClick,
    handleLikeClick,
    handleUnlikeClick
  );
  return card.generateCard();
}

function handleImageClick(imageName, imageLink) {
  imagePopup.open({ name: imageName, link: imageLink });
}

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
profileEditPopup.setEventListeners();

const profileFormValidate = new FormValidator(profileEditForm, config);
const cardFormValidate = new FormValidator(addCardFormElement, config);

cardFormValidate.enableValidation();

const cardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
cardPopup.setEventListeners();

function handleAddCardFormSubmit(data) {
  cardPopup.setButtonText("Saving...");

  const cardData = { name: data.title, link: data.url };

  api
    .addNewCard(cardData)
    .then((res) => {
      const cardElement = renderCard(res);
      cardSection.addItem(cardElement);
      cardPopup.close();
      cardPopup.form.reset();

      cardFormValidate.toggleButtonState();
    })
    .catch((error) => {
      console.error("Error adding new card:", error);
    })
    .finally(() => {
      cardPopup.setButtonText("Save");
    });
}

addNewCardBtn.addEventListener("click", () => {
  cardPopup.open();
});

function handleProfileEditSubmit(formData) {
  profileEditPopup.setButtonText("Saving...");
  api
    .updateUserInfo(formData)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      profileEditPopup.close();
      //modal__form.reset();
    })

    .catch((err) => {
      console.error(err);
      console.log(formData);
    })
    .finally(() => {
      profileEditPopup.setButtonText("Save");
    });
}

//UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  const profileuserInfo = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  profileEditPopup.setInputValues(profileuserInfo);
  profileEditPopup.open();
});
profileFormValidate.enableValidation();

const deleteConfirmationModal = new PopupWithConfirmation("#delete-card-modal");

function handleDeleteClick(card) {
  function deleteCard() {
    deleteConfirmationModal.setButtonText("Deleting");
    api
      .deleteCard(card.id)
      .then(() => {
        deleteConfirmationModal.close();
        card.deleteCard();
      })
      .catch((err) => {
        console.error(err);
      })

      .finally(() => {
        deleteConfirmationModal.setButtonText("Delete");
      });
  }
  deleteConfirmationModal.open();
  deleteConfirmationModal.setSubmitHandler(deleteCard);
}

function handleLikeClick(card) {
  api
    .updateCardLike(card.id, card.isLiked)
    .then(() => {
      card.addLike();
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleUnlikeClick(card) {
  api
    .updateCardLike(card.id, card.isLiked)
    .then(() => {
      card.removeLike();
    })
    .catch((err) => {
      console.error(err);
    });
}

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

let cardSection;
api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      { items: cards, renderer: renderCard },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const editAvatarModal = new PopupWithForm({
  popupSelector: "#change-picture-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});
editAvatarModal.setEventListeners();
const avatarUpdateValidator = new FormValidator(updateAvatarForm, config);

avatarUpdateValidator.enableValidation();

function handleAvatarFormSubmit(inputValues) {
  editAvatarModal.setButtonText("Saving...");
  api
    .updateAvatar(inputValues)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      editAvatarModal.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      editAvatarModal.setButtonText("Save");
    });
}

avatarButton.addEventListener("click", () => {
  editAvatarModal.open();
});
