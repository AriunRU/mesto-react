import React from 'react'

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const itsMyCard = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = `element__heart ${isLiked && 'element__heart_active'}`;

  function handleImgClick() {
    props.onCardClick(props.card);
    props.handleImagePopup();
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <figure className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleImgClick} />
      {itsMyCard &&
        <button
          className="element__remove"
          onClick={handleDeleteClick}
          type="button"
          aria-label="Удалить" />}
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like_container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравиться" />
          <span className="element__heart-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </figure>
  );
}

export default Card
