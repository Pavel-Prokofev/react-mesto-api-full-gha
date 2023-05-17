import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleClickImg(card) {
    props.onCardClick({ name: card.name, link: card.link });
  }

  function handleClickUrn(dellCard) {
    props.onConfirmationPopup();
    props.dellCardId(dellCard._id);
  }

  const listOfCards = props.cards.map((card) => <Card
    key={card._id}
    card={card}
    onCardClick={handleClickImg}
    onUrn={handleClickUrn}
    checkUserLike={props.checkUserLike}
    onCardLike={props.onCardLike}
  />).reverse();

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__box">
          <div className="profile__avatar-box" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
          </div>
          <div className="profile__bio">
            <div className="profile__wrap">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__info">{currentUser.about}</p>
            </div>
            <button type="button" className="profile__edit-button button-opacity" onClick={props.onEditProfile}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button button-opacity" onClick={props.onAddPlace}></button>
      </section>
      <section className="gallery" aria-label="Фото галерея">
        <ul className="gallery__cards">
          {listOfCards}
        </ul>
      </section>

    </main>
  );
}

export default Main;