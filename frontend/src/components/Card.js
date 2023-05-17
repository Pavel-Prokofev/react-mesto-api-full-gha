import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <li className="gallery__card">
      {props.card.owner === currentUser._id && (<button type="button" className="gallery__card-trash button-opacity"
        onClick={() => { props.onUrn(props.card) }}></button>)}
      <img className="gallery__card-image" src={props.card.link} alt={props.card.name} onClick={() => props.onCardClick(props.card)} />
      <div className="gallery__wrap">
        <h2 className="gallery__card-title">{props.card.name}</h2>
        <div className="gallery__card-like-box">
          <button type="button" className={`gallery__card-like ${props.checkUserLike(props.card) && 'gallery__card-like_active'}`} onClick={() => props.onCardLike(props.card)}></button>
          <p className="gallery__card-like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;