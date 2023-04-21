import React from 'react';

import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({isOpen, onClose, isRequest, onDeleteCard, card}) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="deleteCard"
      title="Вы уверены?"
      buttonTitle="Да"
      isOpen={isOpen}
      onClose={onClose}
      isRequest={isRequest}
      onSubmit={handleSubmit}
      />
  );
}

export default DeleteCardPopup;
