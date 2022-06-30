import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `card__trash ${!isOwn && 'card__trash_hidden'}`
  ); 

  const LikesButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  ); 

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  function handleClick() {
     props.onCardClick(props.card);    
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  return (
    <li className="card" key={props.card._id}>
      <img 
        src={props.card.link} 
        alt={props.card.name} 
        className="card__image" 
        onClick={handleClick}
      />
        <div className={cardDeleteButtonClassName} onClick={handleDeleteClick}></div>
        <div className="card__pitch">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__popular">
            <button type="button" className={LikesButtonClassName} onClick={handleLikeClick}></button>
            <span className="card__like-counter">{props.card.likes.length}</span>
          </div>
        </div>
    </li>
  );
}

export default Card;