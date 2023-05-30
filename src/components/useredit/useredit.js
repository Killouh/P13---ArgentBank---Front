import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  profilePending,
  profileError,
  profileFirstName,
  profileLastName,
  storedProfilInfo,
} from '../../features/reducer/profilereduceur'
import { userUpDate } from '../../api/user'
import './useredit.css';


function UserEdit() {
  const dispatch = useDispatch()
  const { firstName, lastName } = useSelector((state) => state.profile);
  const { isRemember } = useSelector((state) => state.login);


  const [editButton, setEditButton] = useState('')
  const [userFirstLastName, setUserFirstLastName] = useState({
    firstName: '',
    lastName: '',
  })

  function handelChange({ currentTarget }) {
    const { value, name } = currentTarget
    setUserFirstLastName({
      ...userFirstLastName,
      [name]: value,
    })
  }

  function editNameButton(e) {
    e.preventDefault()
    setEditButton((current) => !current)
  }

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(profilePending());
    try {
      const newUser = await userUpDate(userFirstLastName);
      dispatch(profileFirstName(newUser.body.firstName));
      dispatch(profileLastName(newUser.body.lastName));
      if (isRemember) {
        dispatch(storedProfilInfo({ firstName: newUser.body.firstName, lastName: newUser.body.lastName, isRemember: true }));
      }
      setEditButton((current) => !current);
    } catch (error) {
      dispatch(profileError(error.response.data.message));
    }
  }

  return (
    <>
      {!editButton ? (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName + ' ' + lastName} !
          </h1>
          <button onClick={editNameButton} className="edit-button">
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <h1>Welcome back</h1>
          <form className="editNameContent" onSubmit={submitHandler}>
            <div className='header-blank-buttons'>
            <div className="headerUserContentSave">
              <input
                className="input-firstname"
                type="text"
                placeholder={firstName}
                name="firstName"
                onChange={handelChange}
                required
              />

            </div>
            <div className="headerUserContentCancel">
              <input
                className="input-lastname"
                type="text"
                placeholder={lastName}
                name="lastName"
                onChange={handelChange}
                required
              />

            </div>
            </div>
            <div className='action-buttons'>
            <button className="edit-button" onClick={editNameButton}>
                Cancel
              </button>
            <button className="edit-button" type="submit">
                Save
              </button>
              </div>

          </form>
        </div>
      )}
    </>
  )
}
export default UserEdit