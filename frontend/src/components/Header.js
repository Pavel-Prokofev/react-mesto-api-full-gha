import headerLogo from '../images/logo/logo.svg';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header(props) {

  const [burgerToggle, setBurgerToggle] = React.useState(true);
  const [windowInnerWidth, setWindowInnerWidth] = React.useState(0);
  const [windowBigSize, setWindowBigSize] = React.useState(false);

  React.useEffect(() => {
    if (props.loggedIn)
      setBurgerToggle(true);
    window.innerWidth >= 769 ? setWindowBigSize(true) : setWindowBigSize(false);
  }, [props.loggedIn]);

  React.useEffect(() => {
    if (burgerToggle) {
      window.addEventListener('resize', handleWindowResize);
    }
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [burgerToggle]);

  React.useEffect(() => {
    if (windowInnerWidth >= 769) {
      setWindowBigSize(true);
    } else {
      setWindowBigSize(false);
    }
  }, [windowInnerWidth]);

  const handleWindowResize = () => {
    setWindowInnerWidth(window.innerWidth);
  }

  const handleBurgerToggleClick = () => {
    setBurgerToggle(!burgerToggle);
  };

  return (
    <header className={`header ${props.loggedIn ? "header_authorized" : "header_unauthorized"} `}>
      <div className={`header__logo-box ${props.loggedIn && "header__logo-box_authorized"}`} >
        <img className="header__logo" src={headerLogo} alt="МЕСТО" />
        {props.loggedIn &&
          <button type="button" className="header__burger-button button-opacity" onClick={handleBurgerToggleClick}>
            <div className={`${burgerToggle ? "header__burger-button_off" : "header__burger-button_on"}`}></div>
            {burgerToggle &&
              <>
                <div className="header__burger-button_off"></div>
                <div className="header__burger-button_off"></div>
              </>
            }
          </button>
        }
      </div>
      <nav className={`header__nav ${(burgerToggle && !windowBigSize && props.loggedIn) && "elem-disabled"} ${props.loggedIn && "header__nav_authorized"}`}>
        {!props.loggedIn ?
          <>
            <NavLink to="/signin" className={({ isActive }) => `${!isActive ? "header__nav-elem button-opacity" : "elem-disabled"}`}>Войти</NavLink>
            <NavLink to="/signup" className={({ isActive }) => `${!isActive ? "header__nav-elem button-opacity" : "elem-disabled"}`}>Регистрация</NavLink>
          </> : <>
            <p className="header__nav-elem header__nav-elem_authorized header__email">{props.userEmail}</p>
            <span className="header__nav-elem header__nav-elem_authorized button-opacity" onClick={props.onConfirmationPopup}>Выйти</span>
          </>
        }
      </nav>
    </header>
  );
}

export default Header;