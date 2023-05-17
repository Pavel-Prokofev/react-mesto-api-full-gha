import AuthenticationForm from './AuthenticationForm.js';

function Login(props) {

  return (
    <AuthenticationForm titleText='Вход'
      buttonText={props.isAction ? 'Вход...' : 'Войти'}
      onSubmit={props.onSubmit}
      isResetForm={props.isResetForm}
    />
  );
}

export default Login;