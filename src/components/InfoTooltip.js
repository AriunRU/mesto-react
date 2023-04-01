function InfoTooltip(props) {
  return (
    <div
      className={`popup popup__sign_content ${
        props.isOpen ? `popup_opened` : ""
      }`}
      onClick={props.onClick} >
      <div className="popup__container popup__sign_type_container">
        <button
          className="popup__close"
          onClick={props.onClose}
          type="button" />
        <div
          className={`popup__sign_img ${
            props.isSignUp
              ? "popup__sign_img_type_successful"
              : "popup__sign_img_type_fail"
          }`} />
        <h2 className="popup__title popup__sign_title">
          {props.isSignUp
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
