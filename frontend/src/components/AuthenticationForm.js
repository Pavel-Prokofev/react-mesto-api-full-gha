import React from 'react';

function AuthenticationForm(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [isValid, setisValid] = React.useState(false);


  React.useEffect(() => {
    if (emailValid && passwordValid) {
      setisValid(true);
    } else {
      setisValid(false);
    };
  }, [emailValid, passwordValid]);

  React.useEffect(() => {
    if (props.isResetForm) {
      setEmail('');
      setPassword('');
    }
  }, [props.isResetForm]);

  const checkValid = async (evt, setError, setValid) => {
    setValid(evt.target.validity.valid);
    setError(evt.target.validity.valid ? '' : evt.target.validationMessage);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
    checkValid(evt, setEmailError, setEmailValid);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
    checkValid(evt, setPasswordError, setPasswordValid);
  };

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      props.onSubmit(email, password);
    }
  };

  return (
    <section className="authentication">
      <h2 className="title title_authentication">{props.titleText}</h2>
      <form name="card-form" className="form" onSubmit={hendleSubmit} noValidate>
        <fieldset className="form__personal-data">

          <input type="email" name="email" id="email-input"
            className="form__text-box form__text-box_authentication form__text-box_type_email"
            value={email} onChange={handleChangeEmail} placeholder="Email"
            required minLength="3" maxLength="320" />
          <span className="form__text-box-error email-input-error">{emailError}</span>

          <input type="password" name="password" id="password-input"
            className="form__text-box form__text-box_authentication form__text-box_type_password"
            value={password} onChange={handleChangePassword} placeholder="Пароль"
            required minLength="7" maxLength="32" />
          <span className="form__text-box-error password-input-error">{passwordError}</span>

        </fieldset>
        <button type="submit"
          className={`form__submit-button form__submit-button_authentication ${!isValid && 'form__submit-button_disabled-authentication'}`}>
          {props.buttonText}
        </button>
      </form>
    </section>
  );
}

export default AuthenticationForm;