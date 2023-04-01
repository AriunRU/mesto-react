import React from 'react'

function PopupWithForm({name, isOpen, onClick, onClose, title, onSubmit, children, buttonTitle, isRequest}) {

  if (isRequest && name !== 'DeleteCard') {
    buttonTitle = 'Сохранение...';
  } else if (isRequest && name === 'DeleteCard') {
    buttonTitle = 'Удаление...'
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}
      onClick={onClick}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit} name={name}>
          {children}
          <button className={`popup__button_save ${name === 'DeleteCard' ? 'popup__button_delete-card' : null}`} type="submit">
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm
