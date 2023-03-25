import React from 'react';

import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoadingRequest}) {
  const inputRef = React.useRef();

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
      isLoadingRequest={isLoadingRequest}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="avatar-link"
        name="avatar" type="url"
        className="popup__input popup__input_field_avatar-link"
        placeholder="Ссылка на картинку"
        ref={inputRef}/>
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
