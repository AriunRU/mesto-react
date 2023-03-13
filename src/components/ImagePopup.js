import React from 'react'

function ImagePopup({ name, isOpen, onClose, card }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container-open">
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
          onClick={onClose}
        />
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <p className="popup__image_subtitle">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
