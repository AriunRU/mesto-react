import React from 'react';

import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="info page__info">
        <div className="info__profile">
          <div onClick={props.onEditAvatar} className="info__profile-avatar-wrapper">
            <img
              src={currentUser.avatar}
              alt="Аватарка профиля"
              className="info__profile-avatar"/>
          </div>
          <div className="info__profile-descr">
            <h1 className="info__profile-name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              type="button"
              aria-label="Редактировать"
              className="info__edit-button"/>
          </div>
          <p className="info__profile-post">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          aria-label="Закрыть"
          className="info__add-button"/>
      </section>

      <section className="elements page__elements">
        <div className="elements__grid-container">

          {props.cards.map(card => {
            return (
              <Card
                key={card._id}
                onApproval={props.onApproval}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                card={card}/>
            );
          })}

        </div>
      </section>
    </main>
  );
}

export default Main;
