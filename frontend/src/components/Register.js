import AuthenticationForm from './AuthenticationForm.js';
import { Link } from 'react-router-dom';

function Register(props) {

  return (
    <>
      <AuthenticationForm titleText='Регистрация'
        buttonText={props.isAction ? 'Регистрация...' : 'Зарегистрироваться'}
        onSubmit={props.onSubmit}
        isResetForm={props.isResetForm}
      />
      <p className="note_when-registering">Уже зарегистрированы?
        <Link to="/signin" className="note_when-registering button-opacity"> Войти</Link>
      </p>
    </>
  );
}

export default Register;