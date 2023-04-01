import { Route, Routes, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <p className="header__link">{props.email}</p>
                <button
                  className="header__button"
                  type="button"
                  onClick={props.onSignOut}
                >
                  Выйти
                </button>
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Link className="header__link" to="/sign-up">
                  Регистрация
                </Link>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Link className="header__link" to="/sign-in">
                  Войти
                </Link>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header
