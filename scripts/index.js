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

const profileEditBtn = document.querySelector("#profile-edit-button");

const addNewCardBtn = document.querySelector(".profile__add-button");

const profileEditModal = document.querySelector("#profile-edit-modal");

const closeProfileModal = document.querySelector("#modal-close");

const addCardFormElement = document.querySelector("#add-card-form");

const addCardModal = document.querySelector("#add-card-modal");

const imageModal = document.querySelector("#image-modal");

const imageOpenedModal = document.querySelector("#add-card-modal");

const closeImageModal = document.querySelector("#close-image");

const addCardModalCloseButton = document.querySelector(
  "#profile-card-modal-close"
);

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardsWrapper = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);

const cardTitleUrl = addCardFormElement.querySelector(".modal__input_type_url");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);

  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");

  const cardTitleEl = cardElement.querySelector(".card__title");

  const likeButton = cardElement.querySelector(".card__like-button");

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  //add dlick listener to the card image element and then call openModal previewImageModal and add that in HTML and also change the img src

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

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

function handleProfileEditSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;

  profileDescription.textContent = profileDescriptionInput.value;

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

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;

  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

closeProfileModal.addEventListener("click", () => closeModal(profileEditModal));

//add new card button

addNewCardBtn.addEventListener("click", () => openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

closeImageModal.addEventListener("click", () => {
  closeModal(imageModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrapper));
