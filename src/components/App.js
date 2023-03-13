import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm'

function App() {
  const [isEditProfilePopupOpen, setOpenEditProfile] = React.useState(false)
  const [isAddPlacePopupOpen, setOpenAddPlace] = React.useState(false)
  const [isEditAvatarPopupOpen, setOpenEditAvatar] = React.useState(false)
  const [isImageOpen, setImageOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})


  function handleCardClick(card) {
    setSelectedCard(card)
    setImageOpen(true)
  }

  function handleEditProfileClick() {
    setOpenEditProfile(true)
  }

  function handleAddPlaceClick() {
    setOpenAddPlace(true)
  }

  function handleEditAvatarClick() {
    setOpenEditAvatar(true)
  }

  function closeAllPopups() {
    setImageOpen(false)
    setOpenAddPlace(false)
    setOpenEditAvatar(false)
    setOpenEditProfile(false)
  }
  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="add-element"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title="новое фото"
        buttonTitle="Создать"
      >
        <input
          required
          className="popup__input"
          type="text"
          placeholder="название"
          id="element-name"
          minLength="2"
          maxLength="30"
          name="name"
        />
        <span className="popup__error element-name-error"></span>
        <input
          required
          className="popup__input"
          type="url"
          placeholder="ссылка на фото"
          id="element-link"
          name="link"
        />
        <span className="popup__error element-link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title="редактировать"
        buttonTitle="Сохранить"
      >
        <input
          required
          className="popup__input"
          type="text"
          placeholder="имя"
          id="name-input"
          minLength="2"
          maxLength="40"
          name="name"
        />
        <span className="popup__error name-input-error"></span>
        <input
          required
          className="popup__input"
          type="text"
          placeholder="проффесия"
          id="description-input"
          minLength="2"
          maxLength="200"
          name="about"
        />
        <span className="popup__error description-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title="новый аватар"
        buttonTitle="Сохранить"
      >
        <input
          required
          className="popup__input"
          type="url"
          placeholder="ссылка"
          id="avatar-link"
          name="avatar"
        />
        <span className="popup__error avatar-link-error"></span>
      </PopupWithForm>

      <ImagePopup
        name="open-image"
        isOpen={isImageOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  )
}

export default App