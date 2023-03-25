import React from 'react';

import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoadingRequest}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }


  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isLoadingRequest={isLoadingRequest}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="name-input"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        className="popup__input"
        placeholder="Имя"
        value={name || ''}
        onChange={handleNameChange}
        />
      <span className="popup__error name-input-error"></span>
      <input
        required
        id="description-input"
        name="about"
        type="text"
        className="popup__input"
        placeholder="О себе"
        value={description || ''}
        onChange={handleDescriptionChange}
        minLength="2"
        maxLength="200"
        />
      <span className="popup__error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
