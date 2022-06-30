import {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  
  const ref = useRef();
  
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: ref.current.value
    });
   
  }
  
  useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input ref={ref} type="url" id="new-avatar" 
        name="avatar" placeholder="Ссылка на новый аватар" 
        className="popup__input popup__input_type_new-avatar" 
        required/>
      <span className="new-avatar-error popup__input-error"></span>
    </PopupWithForm>

  );
}
export default EditAvatarPopup;