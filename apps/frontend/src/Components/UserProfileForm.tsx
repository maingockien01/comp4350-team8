import React from 'react';
import '../css/UserProfileForm.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {getTokenFromCookie} from '../Utils/CookieFunctions';
import {displayError} from '../Utils/Errors';

const UserProfileForm = () => {
  const labels = ['Username', 'Full Name', 'Password', 'Confirm Password'];
  const types = ['text', 'text', 'password', 'password'];
  const [userInfo, setUserInfo] = React.useState(['', '', '', '']);
  const navigate = useNavigate();

  const [formState, setFormState] = React.useState({
    username: '',
    fullName: '',
    password: '',
    confirm_pwd: '',
  });

  const getUserInfo = async () => {
    try {
      const res = await axios.get('rest-api/profile', {
        headers: {Authorization: 'Bearer ' + getTokenFromCookie()},
      });
      if (res.data.status === 'success') {
        setUserInfo([res.data.user.username, res.data.user.fullName, '', '']);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send a POST request to the backend with the form data
    if (
      formState.username === '' &&
      formState.fullName === '' &&
      formState.password === ''
    ) {
      displayError('Please fill at least one field!');
    } else {
      if (formState.password === formState.confirm_pwd) {
        try {
          const res = await axios.post('rest-api/profile', formState, {
            headers: {Authorization: 'Bearer ' + getTokenFromCookie()},
          });
          // Handle the response from the backend
          if (res.data.status === 'success') {
            window.location.reload();
          } else {
            displayError(res.data.message);
          }
        } catch (error) {
          // Handle any errors that occurred during the request
          console.error(error);
        }
      } else {
        displayError('Confirm Password must match Password!');
      }
    }
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="profile-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>User Profile</h1>
        {Object.entries(formState).map(([name, value], index) => (
          <div className="profile-input-box">
            <h3 className="profile-label">{labels[index]}</h3>
            <input
              type={types[index]}
              name={name}
              placeholder={userInfo[index]}
              aria-label={labels[index]}
              onChange={handleChange}
              value={value}
            ></input>
          </div>
        ))}

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
