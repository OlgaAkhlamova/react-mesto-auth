import {useState} from "react";
import {NavLink} from "react-router-dom";

function Register({onRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  };

  function handleChangePassword(evt) {
    setPassword(evt.target.value)
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({password, email});
  }

  return (
    <div className="login__container">
      <div className="login">
        <h3 className="login__title">Регистрация</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            name="email"
            type="email"
            id="email"
            value={email || ""}
            onChange={handleChangeEmail}
            placeholder="Email"
            required
          />
          <input
            className="login__input"
            name="password"
            type="password"
            id="password"
            value={password || ""}
            onChange={handleChangePassword}
            placeholder="Пароль"
            required
          />         
          <button
            className="login__submit"
            type="submit">
              Зарегистрироваться
          </button>
        </form>  
        <div className="login__signup">
          <p className="signup__ask">Уже зарегистрированы? </p>
          <NavLink className="signup__link" to="/sign-in">Войти</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Register;