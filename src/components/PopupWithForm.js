import React from 'react'

function PopupWithForm({ name, title, buttonTitle, isOpen, onClose, children, onSubmit, isRequest }) {

  if (isRequest && name !== 'DeleteCard') {
    buttonTitle = 'Сохранение...';
  } else if (isRequest && name === 'DeleteCard') {
    buttonTitle = 'Удаление...'
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
      <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} name={name} className="popup__form">
          {children}
          <button
            className={`popup__button_save ${name === 'DeleteCard' ? 'popup__button_delete-card' : null}`}
            type="submit">
            {buttonTitle}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
      </div>
    </section>
  )
}

export default PopupWithForm
