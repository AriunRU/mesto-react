function ImagePopup({ onClose, card }) {
  return (
    <section className={`popup ${card && 'popup_opened'}`}>
      <div className="popup__container-open">
        <figure className="popup__place">
          <img
            src={card ? card.link : '#'}
            className="popup__image"
            alt={`Изображение ${card ? card.name : ''}`}/>
          <figcaption className="popup__image_subtitle">{card ? card.name : ''}</figcaption>
        </figure>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__close"/>
      </div>
    </section>
  );
}

export default ImagePopup
