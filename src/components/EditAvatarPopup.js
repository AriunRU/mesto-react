import React from 'react';

import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Обновить аватар"
      onSubmit={handleSubmit}
      buttonTitle={props.buttonTitle}
      onClick={props.onClick} >
      <input
        ref={inputRef}
        className="popup__input"
        id="avatar-link"
        type="text"
        name="avatar"
        placeholder="Ссылка на аватар"
        required />
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
