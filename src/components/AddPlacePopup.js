import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoadingRequest}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen])

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name,
      link: link,
    });

  }

  return (
    <PopupWithForm
      name="add-element"
      title="Новое фото"
      buttonTitle="Создать"
      isLoadingRequest={isLoadingRequest}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="element-name"
        name="name"
        type="text"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}/>
      <span className="popup__error element-name-error"></span>
      <input
        required
        id="element-link"
        name="link"
        type="url"
        className="popup__input"
        placeholder="Ссылка на фото"
        value={link}
        onChange={handleLinkChange}/>
      <span className="popup__error element-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
