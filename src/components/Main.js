import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  function handleLike(card) {
    props.onCardLike(card);
  }

  function handleDelete(card) {
    props.onCardDelete(card);
  }
  
  return (
    <main className="container" aria-label="личная страница пользователя">
      <section className="profile">
        <div className="profile__items">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="фотография пользователя"
              className="profile__avatar"
              name="avatar"
            />
            <div className="profile__overlay" onClick={props.onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-item">
              <h1 className="profile__info-name" name="name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__info-edit"
                aria-label="редактировать профиль"
                title="редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__info-job" name="about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__card-add"
          type="button"
          aria-label="добавить место"
          title="добавить место"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="памятные места пользователя">
        <ul className="cards">
          {/* Контейнер для добавления карточек */}
          {
           props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={handleLike}
                onCardDelete={handleDelete}
              />
            ))
          }
        </ul>
      </section>

    </main>
  );
}

export default Main;