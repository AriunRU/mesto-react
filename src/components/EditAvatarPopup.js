import React from 'react';

import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isRequest}) {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isRequest={isRequest}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="avatar-link"
        name="avatar"
        type="url"
        className="popup__input"
        placeholder="Ссылка на аватар"
        ref={inputRef}/>
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
