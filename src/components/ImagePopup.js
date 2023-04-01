function ImagePopup(props) {
  return (
    <div
      className={`popup ${props.isOpen ? `popup_opened` : ""}`}
      onClick={props.onClick} >
      <div className="popup__container-open">
        <button
          className="popup__close"
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть" />
        <img
          className="popup__image"
          src={props.card?.link}
          alt={props.card?.name} />
        <figcaption className="popup__image_subtitle">{props.card?.name}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup
