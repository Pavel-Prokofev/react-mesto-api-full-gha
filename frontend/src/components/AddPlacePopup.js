import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

  const [title, setTitle] = React.useState('');
  const [img, setImgUrl] = React.useState('');
  const [titleError, setTitleError] = React.useState('');
  const [imgError, setImgError] = React.useState('');
  const [titleValid, setTitleValid] = React.useState(false);
  const [imgValid, setImgValid] = React.useState(false);
  const [isValid, setisValid] = React.useState(false);

  React.useEffect(() => {
    setTitle('');
    setImgUrl('');
    setTitleError('');
    setImgError('');
    setTitleValid(false);
    setImgValid(false);
    setisValid(false);
  }, [props.isOpen]);

  React.useEffect(() => {
    if (titleValid && imgValid) {
      setisValid(true);
    } else {
      setisValid(false);
    };
  }, [titleValid, imgValid]);

  const checkValid = async (evt, setError, setValid) => {
    setValid(evt.target.validity.valid);
    setError(evt.target.validity.valid ? '' : evt.target.validationMessage);
  };

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
    checkValid(evt, setTitleError, setTitleValid);
  };

  const handleChangeImg = (evt) => {
    setImgUrl(evt.target.value);
    checkValid(evt, setImgError, setImgValid);
  };

  const handleSubmit = () => {
    props.onAddPlace({
      name: title,
      link: img
    });
  };

  return (
    <PopupWithForm name='add' title='Новое место' buttonText={props.buttonText} errorText={props.errorText}
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isValid={isValid}>
      <fieldset className="form__personal-data">
        <input type="text" name="title" id="title-input" className="form__text-box form__text-box_type_title"
          value={title} onChange={handleChangeTitle} placeholder="Название" required minLength="2" maxLength="30" />
        <span className="form__text-box-error title-input-error">{titleError}</span>
        <input type="url" name="img" id="img-src-input" className="form__text-box form__text-box_type_img-src"
          value={img} onChange={handleChangeImg} placeholder="Ссылка на картинку" required />
        <span className="form__text-box-error img-input-error">{imgError}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;