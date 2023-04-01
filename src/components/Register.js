import React from "react";
import { NavLink } from "react-router-dom";

function Register(props) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignUp(password, email);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          required
        />
        <input
          className="auth__input"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Пароль"
          type="password"
          name="password"
          id="password"
          required
        />
        <button className="auth__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <NavLink className="auth__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </NavLink>
    </div>
  );
}

export default Register;
