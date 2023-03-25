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
import ApprovalPopup from './ApprovalPopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isApprovalPopupOpen, setIsApprovalPopupOpen] = React.useState(false);
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

  const handleApprovalClick = () => {
    setIsApprovalPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsApprovalPopupOpen(false);
    setSelectedCard(null);
  }

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

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);

    api
      .avatarNewUser(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, apiAvatar: avatar.apiAvatar });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then(newCard => {
          setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
        })
        .catch(err => console.log(err))
    } else {
      api.likeCard(card._id)
        .then(newCard => {
          setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
        })
        .catch(err => console.log(err))
    }
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page-content'>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onApproval={handleApprovalClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteBtnClick}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isLoadingRequest={loadingPopupRequest}
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups} />
          <AddPlacePopup
            isLoadingRequest={loadingPopupRequest}
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} />
          <EditAvatarPopup
            isLoadingRequest={loadingPopupRequest}
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups} />
          <ApprovalPopup
            card={willDeleteCard}
            isLoadingRequest={loadingPopupRequest}
            onDeleteCard={handleCardDelete}
            isOpen={isApprovalPopupOpen}
            onClose={closeAllPopups}>
          </ApprovalPopup>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App
