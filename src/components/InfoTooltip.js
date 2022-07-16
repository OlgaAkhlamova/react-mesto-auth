import React from 'react';

function InfoTooltip({isOpen, image, onClose, message}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} aria-label="ваша регистрация">
      <div className="popup__container-register">
        <img
          className="popup__notice-img"
          alt="Картинка"
          src={image}/>
        <h3 className="popup__notice-text">{message}</h3>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="закрыть сообщение о регистрации"
          title="закрыть сообщение о регистрации" />
      </div>
    </div>
  );
}

export default InfoTooltip;