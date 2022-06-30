import React from 'react';

function ImagePopup(props) {
  
  return (
    <section className={`popup popup_show-zoom ${props.card && 'popup_opened'}`} 
       aria-label="просмотр фотографии">
        <div className="popup__container-zoom"> 
            <img src={props.card?.link} 
              alt={props.card?.name} className="popup__card"/>
            <p className="popup__subtitle-zoom">{props.card?.name}</p>
            <button type="button" className="popup__close popup__close_show-zoom" 
              onClick={props.onClose} aria-label="закрыть изображение" title="закрыть изображение"></button>   
        </div>
      </section> 
  );
}

export default ImagePopup
