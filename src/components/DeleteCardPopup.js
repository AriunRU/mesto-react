import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
  return (
    <PopupWithForm
      name="deleteCard"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
      onClick={props.onClick}
      />
  );
}

export default DeleteCardPopup;
