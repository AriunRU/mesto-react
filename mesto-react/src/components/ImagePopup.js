function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_image ${card && 'popup_opened'}`}>
      <div className="popup__container-image">
        <figure className="popup__place">
          <img
            src={card ? card.link : '#'}
            className="popup__place-image"
            alt={`Изображение ${card ? card.name : ''}`}/>
          <figcaption className="popup__place-descr">{card ? card.name : ''}</figcaption>
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

export default ImagePopup;
