import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userJob);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }


  return (
    <PopupWithForm
      name="edit-profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      buttonTitle={props.buttonTitle}
      onClick={props.onClick} >
      <input
        className="popup__input"
        onChange={handleNameChange}
        id="name-input"
        type="text"
        name="name"
        value={name}
        placeholder="Имя"
        minLength="2"
        maxLength="400"
        required
        />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input"
        onChange={handleDescriptionChange}
        id="description-input"
        type="text"
        name="job"
        value={description}
        placeholder="Работа"
        minLength="2"
        maxLength="200"
        required
        />
      <span className="popup__error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
