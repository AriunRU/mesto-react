import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  React.useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setCardName(e.target.value);
  }

  function handleLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Новое место"
      onSubmit={handleSubmit}
      buttonTitle={props.buttonTitle}
      onClick={props.onClick}
    >
      <input
        className="popup__input"
        onChange={handleNameChange}
        id="element-name"
        type="text"
        name="name"
        value={cardName}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error element-name-error"></span>
      <input
        className="popup__input"
        onChange={handleLinkChange}
        id="element-link"
        type="text"
        name="link"
        value={cardLink}
        placeholder="Ссылка на фото"
        required
      />
      <span className="popup__error element-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
