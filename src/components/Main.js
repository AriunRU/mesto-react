import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.userAvatar}
            alt={currentUser.userName} />
          <button
            className="profile__edit"
            onClick={props.onEditAvatar}
            type="button" />
        </div>
        <div className="profile__info-container">
          <h1 className="profile__title">{currentUser.userName}</h1>
          <button
            onClick={props.onEditProfile}
            type="button"
            aria-label="Редактировать"
            className="profile__edit-button" />
          <p className="profile__subtitle">{currentUser.userJob}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          aria-label="Закрыть"
          className="profile__add-button" />
      </section>
      <section className="elements">
        {props.cards.map(card => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              handleImagePopup={props.handleImagePopup}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} />
          );
        })}
      </section>
    </main>
  )
}

export default Main
