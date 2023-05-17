import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './Header.js';
import Login from './Login.js';
import Register from './Register.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PageNotFound from './PageNotFound.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from "./ProtectedRoute";
import positiveSign from '../images/positive_sign.svg';
import negativeSign from '../images/negative_sign.svg';

function App() {

  const navigate = useNavigate();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ tugle: false, data: {} });
  const [dellCardId, setDellCardId] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState({ tugle: false, infoTooltipText: '', infoTooltipImg: '' });
  const [isConfirmationDellCardPopupOpen, setIsConfirmationDellCardPopupOpen] = React.useState(false);
  const [isConfirmationExitFromProfilePopupOpen, setIsConfirmationExitFromProfilePopupOpen] = React.useState(false);
  const [isConfirmationTitle, setIsConfirmationTitle] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [submitButtonText, setSubmitButtonText] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isAction, setIsAction] = React.useState(false);
  const [isResetForm, setIsResetForm] = React.useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setSubmitButtonText('Сохранить');
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setSubmitButtonText('Сохранить');
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setSubmitButtonText('Создать');
  };

  const handleDellCardId = (dellCardId) => {
    setDellCardId(dellCardId)
  };

  const handleConfirmationDellCardPopupOpen = () => {
    setIsConfirmationDellCardPopupOpen(true);
    setIsConfirmationTitle('Вы уверены?');
    setSubmitButtonText('Ок');
  };

  const handleConfirmationExitFromProfilePopupOpen = () => {
    setIsConfirmationExitFromProfilePopupOpen(true);
    setIsConfirmationTitle('Вы уверены, что хотите выйти из профиля?');
    setSubmitButtonText('Ок');
  };

  const handleCardClick = (card) => {
    setSelectedCard({ tugle: true, data: card });
  };

  const handleInfoTooltipOpen = (newInfoTooltipText, newInfoTooltipImg) => {
    const newInfoTooltipImgCheck = newInfoTooltipImg ? newInfoTooltipImg : '';
    setIsInfoTooltipOpen({ tugle: true, infoTooltipText: newInfoTooltipText, infoTooltipImg: newInfoTooltipImgCheck });
  };

  const closeAllPopups = () => {
    setErrorText(``);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationDellCardPopupOpen(false);
    setIsConfirmationExitFromProfilePopupOpen(false);
    setSelectedCard({ tugle: false, data: {} });
    setIsInfoTooltipOpen({ tugle: false, infoTooltipText: '', infoTooltipImg: '' });
  };

  const handleCloseEvent = (evt) => {
    if (evt.type === 'click') {
      const isOverlay = evt.target.classList.contains('popup');
      const isCloseButton = evt.target.classList.contains('popup__close-button');
      if (isOverlay || isCloseButton) {
        closeAllPopups();
      };
    } else if (evt.type === 'keydown') { if (evt.key === 'Escape') { closeAllPopups(); } };
  };

  React.useEffect(() => {
    const jvt = localStorage.getItem('jwt');
    if (jvt) {
      api.checkJwt()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
          }
        });
    }
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
          if (res._id) {
            api.getAllCards()
              .then((res) => {
                setCards(res);
              })
              .catch((err) => {
                handleInfoTooltipOpen(`Ошибка при загрузке карточек с сервера: ${err}.`);
                setCards([]);
              });
          }
        })
        .catch((err) => {
          handleInfoTooltipOpen(`Ошибка при загрузке данных пользователя с сервера: ${err}.`);
          setCurrentUser({});
          setCards([]);
        });
    }
  }, [loggedIn]);

  const checkUserLike = (card) => {
    return card.likes.some(like => like === currentUser._id)
  };

  const handleCardLike = (card) => {

    const isLiked = checkUserLike(card) ? 'delCardLike' : 'putCardLike';

    api[isLiked](card._id)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        const isLiked = checkUserLike(card) ? 'Ошибка при удалении лайка карточки с сервера:' : 'Ошибка при добавлении лайка карточки на сервер:';
        handleInfoTooltipOpen(`${isLiked} ${err}.`);
      });
  };

  const handleDellCard = (evt) => {
    evt.preventDefault()
    setErrorText(``);
    setSubmitButtonText('Удаление...');
    api.delCard(dellCardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== dellCardId));
        closeAllPopups();
      })
      .catch((err) => {
        setErrorText(`Ошибка при удалении карточки с сервера: ${err}.`);
      })
      .finally(() => {
        setSubmitButtonText('Ок');
      });
  };

  const handleAddCard = ({ name, link }) => {
    setErrorText(``);
    if (currentUser._id) {
      setSubmitButtonText('Создание...');
      api.postNewCard({ name, link })
        .then((newCard) => {
          setCards([...cards, newCard]);
          closeAllPopups();
        })
        .catch((err) => {
          setErrorText(`Ошибка при загрузке новой карточки на сервер: ${err}.`);
        })
        .finally(() => {
          setSubmitButtonText('Создать');
        });
    } else {
      setErrorText(`Ошибка при загрузке новой карточки на сервер вызваная некорреректной загрузкой данных пользователя.`);
    };
  }

  const handleUpdateUser = ({ name, about }) => {
    setErrorText(``);
    if (currentUser._id) {
      setSubmitButtonText('Сохранение...');
      api.patchUserInfo({ name, about })
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => {
          setErrorText(`Ошибка при перезаписи данных пользователя: ${err}.`);
        })
        .finally(() => {
          setSubmitButtonText('Сохранить');
        });
    } else {
      setErrorText(`Ошибка при загрузке новых данных на сервер вызваная некорреректной загрузкой данных пользователя.`);
    }
  };

  const handleUpdateUserAvatar = ({ avatar }) => {
    setErrorText(``);
    if (currentUser._id) {
      setSubmitButtonText('Сохранение...');
      api.patchUserAvatar({ avatar })
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => {
          setErrorText(`Ошибка при перезаписи аватара пользователя: ${err}.`);
        })
        .finally(() => {
          setSubmitButtonText('Сохранить');
        });
    } else {
      setErrorText(`Ошибка при загрузке новых данных на сервер вызваная некорреректной загрузкой данных пользователя.`);
    }
  };

  const handleUserRegister = (email, password) => {
    console.log(email, password);
    setIsResetForm(false);
    if (email && password) {
      setIsAction(true);
      api.userRegistration(email, password)
        .then((res) => {
          navigate('/signin', { replace: true });
          setIsResetForm(true);
          handleInfoTooltipOpen('Вы успешно зарегистрировались!', positiveSign)
        })
        .catch((err) => {
          handleInfoTooltipOpen('Что-то пошло не так! Попробуйте ещё раз.', negativeSign)
        })
        .finally(() => {
          setIsAction(false);
        });
    } else {
      handleInfoTooltipOpen('Что-то пошло не так! Попробуйте ещё раз.', negativeSign)
    };
  };

  const handleUserLogin = (email, password) => {
    setIsResetForm(false);
    if (email && password) {
      setIsAction(true);
      api.userAuthenticate(email, password)
        .then((res) => {
          // console.log(res);
          // console.log(userEmail);
          // console.log(currentUser);
          if (res.token) {
            localStorage.setItem('jwt', res.token);
            setIsResetForm(true);
            setLoggedIn(true);
            setUserEmail(email);
          } else {
            handleInfoTooltipOpen('Что-то пошло не так! Попробуйте ещё раз.', negativeSign)
          }
        })
        .catch((err) => {
          handleInfoTooltipOpen('Что-то пошло не так! Попробуйте ещё раз.', negativeSign)
        })
        .finally(() => {
          setIsAction(false);
        });
    } else {
      handleInfoTooltipOpen('Что-то пошло не так! Попробуйте ещё раз.', negativeSign)
    };
  };

  const handleExitFromProfile = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    closeAllPopups();
    setUserEmail('');
    setCurrentUser({});
    // console.log(userEmail);
    // console.log(currentUser);
  };

  return (
    <div className="page">
      <Header loggedIn={loggedIn} userEmail={userEmail} onConfirmationPopup={handleConfirmationExitFromProfilePopupOpen} />
      <Routes>
        <Route path="/signin" element={<ProtectedRoute
          element={<Login onSubmit={handleUserLogin} isAction={isAction} isResetForm={isResetForm} />}
          loggedIn={!loggedIn}
          elsePath="/" />
        } />
        <Route path="/signup" element={<ProtectedRoute
          element={<Register onSubmit={handleUserRegister} isAction={isAction} isResetForm={isResetForm} />}
          loggedIn={!loggedIn}
          elsePath="/" />
        } />

        <Route path="/" element={<ProtectedRoute
          element={
            <>
              <CurrentUserContext.Provider value={currentUser}>
                <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick} onInfoTooltip={handleInfoTooltipOpen} onCardClick={handleCardClick}
                  onConfirmationPopup={handleConfirmationDellCardPopupOpen} dellCardId={handleDellCardId}
                  cards={cards} checkUserLike={checkUserLike} onCardLike={handleCardLike} />
              </CurrentUserContext.Provider>
              <Footer />
            </>
          }
          loggedIn={loggedIn}
          elsePath="/signin" />
        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseEvent} onUpdateUser={handleUpdateUser}
          buttonText={submitButtonText} errorText={errorText} />
      </CurrentUserContext.Provider>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleCloseEvent} onUpdateUserAvatar={handleUpdateUserAvatar}
        buttonText={submitButtonText} errorText={errorText} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handleCloseEvent} onAddPlace={handleAddCard}
        buttonText={submitButtonText} errorText={errorText} />
      <PopupWithForm name='confirmation' title={isConfirmationTitle} buttonText={submitButtonText} errorText={errorText}
        isOpen={isConfirmationDellCardPopupOpen} onClose={handleCloseEvent} onSubmit={handleDellCard} isValid={true} />
      <PopupWithForm name='confirmation' title='Вы уверены, что хотите выйти из профиля?' buttonText={submitButtonText} errorText={errorText}
        isOpen={isConfirmationExitFromProfilePopupOpen} onClose={handleCloseEvent} onSubmit={handleExitFromProfile} isValid={true} />
      <ImagePopup card={selectedCard} onClose={handleCloseEvent} />
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={handleCloseEvent} />

    </div>
  );
}

export default App;