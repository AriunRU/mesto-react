import React from 'react'

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete, onApproval }) {

  const currentUser = React.useContext(CurrentUserContext);

  const itsMyCard = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(user => user._id === currentUser._id);

  const cardLikeButtonClassName = `element__heart ${isLiked && 'element__heart_active'}`;

  function handleImgClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
    onApproval();
  }

  return (
    <figure className="element">
        <img
          onClick={handleImgClick}
          src={card.link}
          className="element__image"
          alt={`Изображение ${card.name}`} />
        {itsMyCard &&
          <button onClick={handleDeleteClick}
            type="button"
            aria-label="Удалить"
            className="element__remove" />
        }
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_container">
          <button
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравиться"
            className={cardLikeButtonClassName} />
          <span className="element__heart-counter">{card.likes.length}</span>
        </div>
      </div>
    </figure>
  );
}

export default Card
