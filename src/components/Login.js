import React, {useState} from "react";

function Login({onLogin}) {
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
    if (!email || !password) {
      return;
    } else {
      onLogin({password, email});
    }
  }

  return (
    <div className="login__container">
      <div className="login">
        <h3 className="login__title">Вход</h3>
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
              Войти
          </button>
        </form>       
      </div>
    </div>
  )
}

export default Login;