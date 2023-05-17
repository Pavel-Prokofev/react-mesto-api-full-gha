import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [nameValid, setNameValid] = React.useState(false);
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [isValid, setisValid] = React.useState(false);

  React.useEffect(() => {
    currentUser.name ? setName(currentUser.name) : setName('');
    currentUser.about ? setDescription(currentUser.about) : setDescription('');
    setNameError('');
    setDescriptionError('');
    setNameValid(true);
    setDescriptionValid(true);
    setisValid(true);
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
    if (nameValid && descriptionValid) {
      setisValid(true);
    } else {
      setisValid(false);
    };
  }, [nameValid, descriptionValid]);

  const checkValid = async (evt, setError, setValid) => {
    setValid(evt.target.validity.valid);
    setError(evt.target.validity.valid ? '' : evt.target.validationMessage);
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
    checkValid(evt, setNameError, setNameValid);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
    checkValid(evt, setDescriptionError, setDescriptionValid);
  };

  const handleSubmit = () => {
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm name='edit' title='Редактировать профиль' buttonText={props.buttonText} errorText={props.errorText}
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isValid={isValid}>
      <fieldset className="form__personal-data">
        <input type="text" name="username" id="username-input" className="form__text-box form__text-box_type_name"
          value={name} onChange={handleChangeName} placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="form__text-box-error username-input-error">{nameError}</span>
        <input type="text" name="occupation" id="occupation-input" className="form__text-box form__text-box_type_info"
          value={description} onChange={handleChangeDescription} placeholder="Личная информация" required minLength="2" maxLength="200" />
        <span className="form__text-box-error occupation-input-error">{descriptionError}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;