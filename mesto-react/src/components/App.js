import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';

import api from '../api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isApprovalPopupOpen, setIsApprovalPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loadingPopupRequest, setLoadingPopupRequest] = React.useState(false);
  const [willDeleteCard, setWillDeleteCard] = React.useState(null);

  React.useEffect(() => {
    api.getAllNeededData()
      .then(data => {
        const [userData, cardData] = data;

        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch(err => console.log(err))
  }, []);


  const handleAddPlaceSubmit = (newCardData) => {
    setLoadingPopupRequest(true);

    api.addNewUserCard(newCardData)
      .then(newApiCardData => {
        setCards([newApiCardData, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingPopupRequest(false))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    if (isLiked) {
      api.dislikeCard(card._id)
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

  const handleCardDelete = (card) => {
    setLoadingPopupRequest(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();

      })
      .catch(err => console.log(err))
      .finally(() => setLoadingPopupRequest(false))
  }

  const handleUpdateUser = (newUserData) => {
    setLoadingPopupRequest(true);

    api.setProfileUserInfo(newUserData)
      .then(newApiUserData => {
        setCurrentUser(newApiUserData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingPopupRequest(false))

  }

  const handleUpdateAvatar = (newAvatarData) => {
    setLoadingPopupRequest(true);

    api.changeUserAvatar(newAvatarData)
      .then(() => {
        setCurrentUser({...currentUser, avatar: newAvatarData.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingPopupRequest(false))
  }

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        <Header/>

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

        <Footer/>

        <EditProfilePopup isLoadingRequest={loadingPopupRequest} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

        <AddPlacePopup isLoadingRequest={loadingPopupRequest} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        <EditAvatarPopup isLoadingRequest={loadingPopupRequest} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

        <ApprovalPopup card={willDeleteCard} isLoadingRequest={loadingPopupRequest} onDeleteCard={handleCardDelete} isOpen={isApprovalPopupOpen} onClose={closeAllPopups}></ApprovalPopup>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}/>

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
