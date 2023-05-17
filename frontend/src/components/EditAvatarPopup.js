import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const avatarUrlRef = React.useRef();
  const [avatarError, setAvatarError] = React.useState('');
  const [isValid, setisValid] = React.useState(false);

  React.useEffect(() => {
    setAvatarError('');
    setisValid(false);
    avatarUrlRef.current.value = '';
  }, [props.isOpen]);

  const checkValid = async (evt, setError, setValid) => {
    setValid(evt.target.validity.valid);
    setError(evt.target.validity.valid ? '' : evt.target.validationMessage);
  };

  const handleChangeAvatar = (evt) => {

    checkValid(evt, setAvatarError, setisValid);
  };

  const handleSubmit = () => {
    props.onUpdateUserAvatar({
      avatar: avatarUrlRef.current.value
    });
  };

  return (
    <PopupWithForm name='edit-avatar' title='Обновить аватар' buttonText={props.buttonText} errorText={props.errorText}
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isValid={isValid}>
      <fieldset className="form__personal-data">
        <input ref={avatarUrlRef} onChange={handleChangeAvatar} type="url" name="avatar" id="avatar-input" className="form__text-box form__text-box_type_avatar-src"
          defaultValue="" placeholder="Ссылка на аватар" required />
        <span className="form__text-box-error avatar-input-error">{avatarError}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;