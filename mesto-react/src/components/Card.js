import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete, onApproval}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(user => user._id === currentUser._id);

  const cardLikeButtonClassName = (
    `card-place__like ${isLiked && 'card-place__like_active'}`
  );;

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
    <figure className="card-place">
      <img
        onClick={handleImgClick}
        src={card.link}
        className="card-place__img"
        alt={`Изображение ${card.name}`}/>
      {isOwn && <button onClick={handleDeleteClick} type="button" aria-label="Удалить" className="card-place__delete"/>}
      <figcaption className="card-place__descr">
        <h2 className="card-place__name">{card.name}</h2>
        <div className="card-place__wrapper-likes">
          <button onClick={handleLikeClick} type="button" aria-label="Нравиться" className={cardLikeButtonClassName}/>
          <p className="card-place__like-count">{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
