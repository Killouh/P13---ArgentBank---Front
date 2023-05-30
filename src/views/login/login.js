import './login.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../api/authentification';
import { useNavigate } from 'react-router-dom'
import {
  logingPending,
  logingSuccess,
  logingError,
  logingRemember,
  storedToken,
} from '../../features/reducer/loginreducer';


// redux plutot que local storage / faire le remember me egalement


export default function Login() {
  const { isRemember } = useSelector((state) => state.login)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [credientials, setCredientials] = useState({
    email: '',
    password: '',
  })

  function handleChange({ currentTarget }) {
    const { value, name } = currentTarget
    setCredientials({
      ...credientials,
      [name]: value,
    })
  }

  function errorDisplay(error) {
    window.alert(error);
  }

  async function handleSubmit(e) {
    e.preventDefault()

    dispatch(logingPending())
    try {
      const isAuth = await loginUser(credientials)

      if (isRemember) {
        dispatch(storedToken({ token: isAuth.body.token, isRemember: true }));
      }

      dispatch(logingSuccess())
      navigate('/profile')
    } catch (error) {
      console.log(error)
      dispatch(logingError(error.response.data.message))
      errorDisplay(error.response.data.message);
    }
  }



  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="email"
              onChange={handleChange} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange} />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              defaultChecked={isRemember}
              onChange={() => dispatch(logingRemember(!isRemember))}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" variant="success" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}