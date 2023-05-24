import React from 'react';
import './profile.css';
import { profileUser } from '../../api/user';
import { useDispatch, useSelector } from 'react-redux'
import { profileFirstName, profileLastName, profileError } from '../../features/reducer/profilereducer'



export default function Profile() {
    const dispatch = useDispatch()
     // Récupération des données depuis le store
  const firstName = useSelector((state) => state.profile.firstName);
  const lastName = useSelector((state) => state.profile.lastName);
    const { isRemember } = useSelector((state) => state.login)
    function errorDisplay(error) {
      window.alert(error);
    }
  
    profileUser()
      .then((data) => {
        dispatch(profileFirstName(data.body.firstName))
        dispatch(profileLastName(data.body.lastName))
        console.log(data.body.firstName);
        console.log(data.body.firstName);
        
  
  
        if (isRemember) {
          localStorage.setItem('firstName', data.body.firstName)
          localStorage.setItem('lastName', data.body.lastName)
        } else {
          localStorage.removeItem('firstName')
          localStorage.removeItem('lastName')
        }
      })
      .catch((error) => {
        dispatch(profileError(error.response.data.message))
        errorDisplay(error.response.data.message);
      });
  
    return (
      <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName}</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
    );
  }
  