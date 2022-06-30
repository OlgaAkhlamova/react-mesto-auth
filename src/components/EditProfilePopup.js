import {useContext, useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('Пользователь');
  const [description, setDescription] = useState('О себе');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    },[currentUser, props.isOpen]
  );

  function handleChangeName(evt) {
    setName(evt.target.value)
  };

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  };

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
        username: name,
        userjob: description
    });
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input type="text" id="name-card" 
        name="username" placeholder="Имя" value={name || 'Загружаю...'}
        onChange={handleChangeName} 
        className="popup__input popup__input_type_name " 
        minLength="2" maxLength="40" required/>
      <span className="name-card-error popup__input-error"></span>
      <input type="text" id="job-card" 
        name="userjob" placeholder="О себе" value={description || 'Загружаю...'}
        onChange={handleChangeDescription} 
        className="popup__input popup__input_type_job" minLength="2" maxLength="200" required/>
      <span className="job-card-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;