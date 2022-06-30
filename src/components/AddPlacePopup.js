import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setPlaceName] = useState('');
  const [link, setLink] = useState('');

  function handleChangePlaceName(evt) {
    setPlaceName(evt.target.value)
  };

  function handleChangePlaceLink(evt) {
    setLink(evt.target.value)
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({name, link});
  };

  useEffect(() => {
    setPlaceName('');
    setLink('');
  }, [props.isOpen]);
  
  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input type="text" id="place-card" 
        name="name" placeholder="Название" 
        value={name || ''} onChange={handleChangePlaceName}
        className="popup__input popup__input_type_designation" 
        minLength="2" maxLength="30" required/>
      <span className="place-card-error popup__input-error"></span>
      <input type="url" id="link-card" 
        name="link" placeholder="Ссылка на картинку" 
        value={link || ''} onChange={handleChangePlaceLink}
        className="popup__input popup__input_type_card-link" required/>
      <span className="link-card-error popup__input-error"></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup;