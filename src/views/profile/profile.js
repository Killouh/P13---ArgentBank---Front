import {useEffect, useRef} from 'react';
import './profile.css';
import { profileUser } from '../../api/user';
import { useDispatch, useSelector } from 'react-redux'
import { profileFirstName, profileLastName, profileError, updateProfilInfo } from '../../features/reducer/profilereduceur'
import UserEdit from '../../components/useredit/useredit'

// revoir les locales storage pour faire en redux 
export default function Profile() {
  const dispatch = useDispatch();
  const { isRemember } = useSelector((state) => state.login);
  const isFirstResponse = useRef(true);

  function errorDisplay(error) {
    window.alert(error);
  }

  useEffect(() => {
    profileUser()
      .then((data) => {
        if (isFirstResponse.current) {
          dispatch(profileFirstName(data.body.firstName));
          dispatch(profileLastName(data.body.lastName));

          if (isRemember) {
            dispatch(updateProfilInfo({ firstName: data.body.firstName, lastName: data.body.lastName, isRemember: true }));
          }

          isFirstResponse.current = false; // no more render when first response
        }
      })
      .catch((error) => {
        dispatch(profileError(error.response.data.message));
        errorDisplay(error.response.data.message);
      });
  }, [dispatch, isRemember]);


  return (
    <main className="main bg-dark">
      <UserEdit />
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
