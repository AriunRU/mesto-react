import React from 'react'

function Card({ card, handleClick, userId }) {
  const {name, link, owner, likes} = card
  const isLiked = likes.some((like) => like._id === userId)
  const itsMyCard = owner._id === userId
  return (
    <figure className="element">
      {itsMyCard && (
        <button
          className="element__delete"
          type="button"
          aria-label="удалить"
        />
      )}
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <div className="element__like_container">
          <button
            className={`element__heart ${isLiked && 'element__heart_active'}`}
            type="button"
            aria-label="нравится"
          />
          <div className="element__heart-counter">{likes.length}</div>
        </div>
      </div>
    </figure>
  )
}

export default Card
