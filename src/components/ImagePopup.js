import React from 'react'

function ImagePopup({ name, isOpen, onClose, card }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container-open">
        <button
          className="popup__close link-opacity"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <img
          className="popup__open-photo"
          src={card.link}
          alt={card.name}
          onClick={onClose}
        />
        <p className="popup__open-photo-subtitle">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
