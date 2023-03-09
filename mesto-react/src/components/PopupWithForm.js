import React from 'react';

function PopupWithForm({name, title, buttonTitle, isOpen, onClose, children, onSubmit, isLoadingRequest}) {

  if (isLoadingRequest && name !== 'approval') {
    buttonTitle = 'Сохранение...';
  } else if (isLoadingRequest && name === 'approval') {
    buttonTitle = 'Удаление...'
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <form onSubmit={onSubmit} name={name} className="popup__form popup__form_edit">
          <h2 className="popup__title-form">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__button-form ${name === 'approval' ? 'popup__button-form_type_approval' : null}`}>
            {buttonTitle}
          </button>
        </form>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__close"/>
      </div>
    </section>
  );
}

export default PopupWithForm;
