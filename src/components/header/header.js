import React, { useRef, useEffect } from 'react';
import './header.css';
import argentBankLogo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {
  logingOut,
} from '../../features/reducer/loginreducer'





export default function Header() {
  const isAuth = useSelector((state) => state.login.isAuth);
  const loginTextRef = useRef(null)
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logingOut());

  };

  let loginLink = null;

  if (isAuth) {
    loginLink = (
      <Link className="main-nav-item" to="/" onClick={handleLogout} ref={loginTextRef}>
        <i className="fa fa-user-circle"></i>
        Log Out
      </Link>
    );
  } else {
    loginLink = (
      <Link className="main-nav-item" to="/login" ref={loginTextRef}>
        <i className="fa fa-user-circle"></i>
        Sign In
      </Link>
    );
  }


  useEffect(() => {
    if (loginTextRef.current) {
      if (isAuth === false) {
        loginTextRef.current.textContent = 'Sign In';
      } else {
        loginTextRef.current.textContent = 'Log Out';
      }
    }
  }, [isAuth]);



  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>{loginLink}</div>
      </nav>
    </header>
  )
}