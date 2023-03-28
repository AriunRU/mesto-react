import React from 'react'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loadingPopupRequest, setIsLoading] = React.useState(false);
  const [willDeleteCard, setWillDeleteCard] = React.useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleDeleteBtnClick = (card) => {
    setWillDeleteCard(card);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleDeleteCardClick = () => {
    setIsDeleteCardPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
  }

  const isOpen =
  isEditAvatarPopupOpen ||
  isEditProfilePopupOpen ||
  isAddPlacePopupOpen ||
  isDeleteCardPopupOpen

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keyup', closeByEscape);
      return () => {
        document.removeEventListener('keyup', closeByEscape);
      }
    }
  }, [isOpen])

  React.useEffect(() => {
    Promise.all([api.getUsersApi(), api.getInitialCards()])
      .then(data => {
        const [userData, cardData] = data;

        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch(err => console.log(err))
  }, []);

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);

    api
      .addNewCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);

    api
      .infoNewUser(name, about)
      .then(newUserData => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(newAvatarData) {
    setIsLoading(true);

    api
      .avatarNewUser(newAvatarData)
      .then(() => {
        setCurrentUser({
          ...currentUser, avatar: newAvatarData.avatar
        });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='full-content'>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onDeleteCard={handleDeleteCardClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteBtnClick}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isRequest={loadingPopupRequest}
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups} />
          <AddPlacePopup
            isRequest={loadingPopupRequest}
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} />
          <EditAvatarPopup
            isRequest={loadingPopupRequest}
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups} />
          <DeleteCardPopup
            card={willDeleteCard}
            isRequest={loadingPopupRequest}
            onDeleteCard={handleCardDelete}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App
