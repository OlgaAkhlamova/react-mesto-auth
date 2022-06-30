import React from 'react';

function PopupWithForm(props) {

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose()
    };
  }

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={handleOverlayClick} >
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form className={`popup__form popup__form_${props.name}`} name={`${props.name}-form`} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button type="submit" className="popup__save" title="отправка формы">{props.buttonText}</button>
        </form>
        <button type="button" className="popup__close" aria-label="закрыть форму" title="закрыть форму" onClick={props.onClose}/>   
      </div>
    </section>
  );
}

export default PopupWithForm
