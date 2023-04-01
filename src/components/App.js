import api from "../utils/Api";
import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as Auth from "../utils/Auth";

import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    userName: "",
    userJob: "",
    userAvatar: "",
    _id: "",
  });
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLogedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImagePopup() {
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleLogin() {
    setIsLogedIn(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleSignUpStatus() {
    setIsSignUp(true);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isInfoTooltipOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleOverlay(e) {
    if (e.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    Promise.all([api.getUsersApi(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser({
          userName: userData.name,
          userJob: userData.about,
          userAvatar: userData.avatar,
          _id: userData._id,
        });
        setCards(cardsData);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, []);

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard(name, link)
      .then((newCard) => {
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
      .then((data) => {
        setCurrentUser({
          userName: data.name,
          userJob: data.about,
          userAvatar: data.avatar,
          _id: data._id,
        });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .avatarNewUser(avatar)
      .then((data) => {
        setCurrentUser({
          userName: data.name,
          userJob: data.about,
          userAvatar: data.avatar,
          _id: data._id,
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
      .finally(() => setIsLoading(false))
  }

  const navigate = useNavigate();

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setIsLogedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  const location = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/sign-up") {
      navigate("/sign-in", { replace: true });
    }
  }, [location.pathname]);

  React.useEffect(() => {
    tokenCheck();
  }, [isLoggedIn]);

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
    setIsLogedIn(false);
  }

  function handleRegister(password, email) {
    Auth.register(password, email)
      .then(() => {
        handleSignUpStatus();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsSignUp(false);
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  function handleSignIn(password, email) {
    Auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          handleLogin();
          localStorage.setItem("jwt", data.token);
          setEmail(data.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSignUp(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{ state: isLoggedIn, handleLogin: handleLogin }}
      >
        <div className="page">
          <div className="full-content">
            <Header email={email} onSignOut={signOut} />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    exact
                    element={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onDeleteCard={handleDeleteCardClick}
                    onCardDelete={handleCardDelete}
                    onCardClick={setSelectedCard}
                    handleImagePopup={handleImagePopup}
                    onCardLike={handleCardLike}
                    cards={cards}
                     />
                } />
              <Route
                path="/sign-up"
                element={<Register onSignUp={handleRegister} />} />
              <Route
                path="/sign-in"
                element={<Login onSignIn={handleSignIn} />} />
            </Routes>
            {isLoggedIn && <Footer />}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              onClick={handleOverlay} />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              buttonTitle={isLoading ? "Сохранение..." : "Создать"}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              onClick={handleOverlay} />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              onClick={handleOverlay} />
            <DeleteCardPopup
              isOpen={isDeleteCardPopupOpen}
              onClose={closeAllPopups}
              onDeleteCard={handleCardDelete}
              onClick={handleOverlay} />
            <ImagePopup
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
              onClick={handleOverlay} />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              isSignUp={isSignUp}
              onClose={closeAllPopups}
              onClick={handleOverlay} />
          </div>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
